import React, { useState } from 'react';

const Home: React.FC = () => {
  const [socialMediaLink, setSocialMediaLink] = useState('');

  const handleAnalyzeClick = () => {
    if (socialMediaLink.trim()) {
      console.log('Analyzing link:', socialMediaLink);
      // Here you would implement the actual analysis logic
      // This could redirect to a results page or process the link
      alert('Analysis started for: ' + socialMediaLink);
    } else {
      alert('Please enter a valid social media link');
    }
  };

  return (
    <div className="w-full">
    <div 
    className="flex-1 flex items-center justify-center px-4 py-16 w-full"
    style={{
      backgroundImage: 'url("/bg.png")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all hover:shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Social Media Analyzer</h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="social-link" className="block text-sm font-medium text-gray-700 mb-2">
              Paste your social media link
            </label>
            <input
              type="url"
              id="social-link"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
              placeholder="https://www.example.com/profile"
              value={socialMediaLink}
              onChange={(e) => setSocialMediaLink(e.target.value)}
            />
          </div>

          <button
            onClick={handleAnalyzeClick}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-md transition duration-150 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Analyze
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Analyze any social media profile with our advanced AI tools
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;

