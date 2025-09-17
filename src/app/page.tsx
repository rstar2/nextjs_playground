import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image className="dark:invert" src="/globe.svg" alt="Globe logo" width={180} height={38} priority />
      <h1 className="text-4xl font-bold">Next.js Playground</h1>
      <p className="mt-4 text-lg">Different Next.js / React / Tailwind / UI experiments</p>
    </div>
  );
}
