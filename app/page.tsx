'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      toast.success(`Welkom terug, ${session.user.name || 'gebruiker'}!`);
    }
  }, [status, session]);

  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-2xl text-blue-900">Laden...</div>
      </div>
    );
  }

  // Toon de "pending approval" pagina alleen als de gebruiker NIET is goedgekeurd EN GEEN admin is
  if (session?.user && !session.user.isApproved && session.user.role !== 'admin') {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="max-w-md text-center">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Account in Afwachting</h2>
            <p className="text-blue-800">
              Je account wacht momenteel op goedkeuring van de beheerder. Je krijgt bericht zodra je toegang is verleend.
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" />
      <main className="container mx-auto px-4 py-8 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-900">
            Lars Vermeulen
          </h1>
          <p className="text-xl md:text-2xl text-blue-800 max-w-3xl mx-auto">
            19-jarige Software Developer uit regio Rotterdam, met een passie voor moderne webtechnologieën
            en een sterke basis in software development.
          </p>
        </section>

        {/* About Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">Over Mij</h2>
          <div className="bg-white shadow-lg rounded-lg p-8 space-y-4 border border-gray-200">
            <p className="text-lg text-blue-800">
              Momenteel studeer ik Software Development aan de Hogeschool Rotterdam, waar ik mijn kennis
              en vaardigheden verder ontwikkel. Hiervoor heb ik al een MBO niveau 4 diploma behaald in
              Software Development, wat mij een sterke technische basis heeft gegeven.
            </p>
            <p className="text-lg text-blue-800">
              Mijn doel is om innovatieve en gebruiksvriendelijke webapplicaties te ontwikkelen die
              een positieve impact hebben op gebruikers.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-center text-blue-900">Technische Vaardigheden</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Frontend Skills */}
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Frontend Development</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  Next.js & React
                </li>
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  Tailwind CSS
                </li>
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  HTML5 & CSS3
                </li>
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                  JavaScript
                </li>
              </ul>
            </div>

            {/* Backend Skills */}
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-blue-900">Backend Development</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  Python
                </li>
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  Node.js
                </li>
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  API Development
                </li>
                <li className="flex items-center text-blue-800">
                  <span className="w-4 h-4 bg-blue-500 rounded-full mr-2"></span>
                  Database Management
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">Opleiding</h2>
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-900">HBO Software Development</h3>
              <p className="text-blue-800">Hogeschool Rotterdam</p>
              <p className="text-blue-700">Huidig</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-900">MBO Niveau 4 Software Development</h3>
              <p className="text-blue-800">Diploma behaald</p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-900">Contact</h2>
          <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-blue-900">
                  Naam
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-blue-900">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-blue-900">
                  Bericht
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Verstuur
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
