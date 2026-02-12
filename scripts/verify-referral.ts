
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log("Verifying Referral System...")

    // 1. Create Sponsor
    const sponsorEmail = `sponsor-${Date.now()}@test.com`
    const sponsor = await prisma.user.create({
        data: {
            name: "Sponsor User",
            email: sponsorEmail,
            referralCode: `REF-${Date.now()}`, // Unique code
            memberStats: { create: {} }
        }
    })
    console.log(`Created Sponsor: ${sponsor.name} (${sponsor.referralCode})`)

    // 2. Create Downline
    // Verify logic: The app looks up referral code to find sponsor ID.
    // We will simulate that logic here.
    const codeToUse = sponsor.referralCode!
    const foundSponsor = await prisma.user.findUnique({ where: { referralCode: codeToUse } })

    if (!foundSponsor) {
        console.error("FAILURE: Could not find sponsor by referral code.")
        return
    }

    const downlineEmail = `downline-${Date.now()}@test.com`
    const downline = await prisma.user.create({
        data: {
            name: "Downline User",
            email: downlineEmail,
            referralCode: `REF-D-${Date.now()}`,
            sponsorId: foundSponsor.id,
            memberStats: { create: {} }
        }
    })
    console.log(`Created Downline: ${downline.name} linked to Sponsor ID: ${foundSponsor.id}`)

    // 3. Verify Relationship from Sponsor side
    const sponsorCheck = await prisma.user.findUnique({
        where: { id: sponsor.id },
        include: { downlines: true }
    })

    if (sponsorCheck?.downlines.length === 1 && sponsorCheck.downlines[0].id === downline.id) {
        console.log("SUCCESS: Sponsor has correct downline.")
    } else {
        console.error("FAILURE: Downline not found on sponsor.", sponsorCheck?.downlines)
    }

    // 4. Verify Relationship from Downline side
    const downlineCheck = await prisma.user.findUnique({
        where: { id: downline.id },
        include: { sponsor: true }
    })

    if (downlineCheck?.sponsor?.id === sponsor.id) {
        console.log("SUCCESS: Downline has correct sponsor.")
    } else {
        console.error("FAILURE: Sponsor not found on downline.")
    }
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => await prisma.$disconnect())
