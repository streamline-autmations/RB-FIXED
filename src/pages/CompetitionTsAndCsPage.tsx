import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const CompetitionTsAndCsPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="bg-[#1E1E1E] p-8 rounded-2xl shadow-lg border border-yellow-500/20">
          <h1 className="text-4xl font-bebas text-yellow-400 mb-6 text-center">
            Competition Rules & Terms and Conditions
          </h1>
          <div className="prose prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bebas prose-h2:text-yellow-300 prose-h2:mb-2 prose-p:leading-relaxed prose-a:text-red-500 hover:prose-a:text-red-400">
            <h2>1. Eligibility</h2>
            <p>
              This competition is open to participants of any age and from any country, except for employees of RecklessBear and their close relatives and anyone otherwise connected with the organisation or judging of the competition. Entry is limited to one per person.
            </p>

            <h2>2. How to Enter</h2>
            <p>
              To enter the competition, participants must first register via the competition pop-up on the website. After registering, participants must find all five (5) hidden golden logos scattered throughout the RecklessBear website (www.recklessbear.co.za). Once all five logos are found, the participant is automatically entered into the final prize draw.
            </p>

            <h2>3. Competition Period</h2>
            <p>
              The competition begins on 28 July 2025 and ends on 28 August 2025 at 11:59 PM SAST. Entries received after this time will not be valid.
            </p>

            <h2>4. The Prize</h2>
            <p>
              The prize is R10,000 (ten thousand South African Rand). The prize is not transferable.
            </p>

            {/* --- UPDATED SECTION STARTS HERE --- */}
            <h2>5. Winner Selection and Notification</h2>
            <p>
              The winner will be chosen by a random draw from all valid entries. The winner will be announced during a live stream on RecklessBear's social media channels on <strong>29 August 2025 at approximately 6:00 PM SAST</strong>.
            </p>
            <p>
              Following the live announcement, the winner will be officially notified via the email address and/or phone number provided during registration within 24 hours. The selected winner must respond to the official notification to claim their prize within 7 days.
            </p>
            <p>
              If the winner fails to respond within the 7-day period, or is found to be ineligible, they will forfeit the prize. In such an event, RecklessBear reserves the right to select a new winner by conducting another random draw from the remaining valid entries. This process will be repeated until a winner successfully claims the prize.
            </p>
            {/* --- UPDATED SECTION ENDS HERE --- */}

            <h2>6. General Conditions</h2>
            <p>
              By entering this competition, an entrant is indicating their agreement to be bound by these terms and conditions. RecklessBear reserves the right to cancel or amend the competition and these terms and conditions without notice. Any changes to the competition will be notified to entrants as soon as possible.
            </p>
            <p>
              This promotion is in no way sponsored, endorsed, or administered by, or associated with, Facebook, Instagram, or any other Social Network.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CompetitionTsAndCsPage;
