import Link from 'next/link';
import Image from 'next/image';

const WelcomePage = () => {
    return (
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-sans">

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-yellow-400 animate-bounce">
                    Your Stage. Your Story. Your Superstar Podcast
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl">
                    Stream Live, Share Everywhere, Shine Forever. Broadcast across
                    <span className="font-bold underline decoration-yellow-300"> YouTube, Facebook, X, Instagram, TikTok</span> and more.
                    Join conversations, interact with fans, or step in as a guest on top shows!
                </p>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <Link href="/#">
                    <span className="cursor-pointer bg-yellow-400 text-purple-900 px-8 py-4 rounded-full font-bold shadow-lg transform hover:scale-110 hover:bg-yellow-500 transition-all duration-300">
                        Go to App
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col md:flex-row gap-6 text-left text-white max-w-4xl">
                    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md hover:bg-opacity-20 transition">
                        <h3 className="font-bold text-lg mb-2">🎙️ Aspiring Podcasters</h3>
                        <p>Start your show instantly and broadcast live with zero setup hassle.</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md hover:bg-opacity-20 transition">
                        <h3 className="font-bold text-lg mb-2">🌍 Global Audience</h3>
                        <p>Reach fans worldwide by streaming simultaneously to multiple platforms.</p>
                    </div>
                    <div className="bg-white bg-opacity-10 p-4 rounded-lg shadow-md hover:bg-opacity-20 transition">
                        <h3 className="font-bold text-lg mb-2">🏆 Build Your Brand</h3>
                        <p>Monetize your show, gain followers, and grow a loyal community.</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white text-gray-900 py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Why Choose MySuperstarAIpodcast?</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <div className="bg-purple-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Start Your Own Show Instantly</h3>
                            <p>Launch your podcast with zero setup hassle — record live, schedule episodes, or create on-demand content.</p>
                        </div>
                        <div className="bg-indigo-600 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Stream Across Platforms</h3>
                            <p>Simultaneously broadcast to YouTube, Facebook, X, Instagram, TikTok, and more.</p>
                        </div>
                        <div className="bg-purple-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Engage Listeners in Real-Time</h3>
                            <p>Interact with fans through live chat, polls, Q&As, and shoutouts — turn listeners into loyal community members.</p>
                        </div>
                        <div className="bg-indigo-500 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Invite Guests & Co-Hosts</h3>
                            <p>Collaborate with friends, influencers, or industry experts — host interviews, panels, or joint live streams.</p>
                        </div>
                        <div className="bg-purple-400 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Grow Your Audience</h3>
                            <p>Gain followers, get featured in curated discovery sections, and track analytics to optimize your content.</p>
                        </div>
                        <div className="bg-indigo-400 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Monetize & Build Your Brand</h3>
                            <p>Use sponsorships, listener support, and premium content options — turn your podcast into a profitable venture.</p>
                        </div>
                        <div className="bg-purple-300 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Host Interactive Events</h3>
                            <p>Run live workshops, fan meetups, Q&A sessions, or community debates — bring people together virtually.</p>
                        </div>
                        <div className="bg-indigo-300 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Discover Trending Content</h3>
                            <p>Find top podcasts, trending topics, and niche communities that match your interests and grow your knowledge.</p>
                        </div>
                        <div className="bg-purple-200 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <h3 className="text-2xl font-semibold mb-2">Learn & Improve Your Skills</h3>
                            <p>Access tips, tutorials, and insights from top creators — improve your content creation, streaming, and engagement skills.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer / Call to Action */}
            <footer className="bg-gray-900 text-white py-12 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Become a Superstar?</h3>
                <p className="mb-6">Go to the app and start streaming your story to the world today!</p>
                <div className="flex justify-center gap-4">
                  <Link href="/#">
                    <span className="cursor-pointer bg-yellow-400 text-purple-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-500 transition">Go to App</span>
                  </Link>
                </div>
            </footer>

        </div>
    );
};

export default WelcomePage;
