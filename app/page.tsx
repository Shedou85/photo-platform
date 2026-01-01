// Removed: import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <main className="flex flex-col items-center justify-center p-8 text-center max-w-2xl">
        {/* Removed: Image component */}
        <h2 className="text-4xl font-extrabold text-green-600 mb-8">Marius Dainys</h2> {/* Added PixelForge text */}
        <h1 className="text-5xl font-bold mb-4">Projektas kuriamas!</h1>
        <p className="text-xl mb-6">
          Šiuo metu aktyviai dirbame prie nuotraukų platformos, kuri leis lengvai dalintis, saugoti ir tvarkyti savo nuotraukas.
          Mūsų tikslas – sukurti intuityvią ir galingą platformą fotografams ir nuotraukų mėgėjams.
        </p>
        <p className="text-lg">
          Užsukite vėliau, kai projektas bus paruoštas!
        </p>
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Ačiū už jūsų kantrybę!
        </p>
      </main>
    </div>
  );
}
