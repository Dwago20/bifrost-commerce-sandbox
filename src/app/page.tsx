
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export default function Home() {
  const t = useTranslations('Home')

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              {t('welcome')}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">
              {t('subtitle')}
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/shop">
              <Button className="bg-white text-black hover:bg-gray-200" size="lg">
                {t('shopNow')}
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="text-black border-white hover:bg-white hover:text-black" size="lg">
                {t('joinNow')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
