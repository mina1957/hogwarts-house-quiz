import React, { useEffect, useState } from 'react';
import { 
  FacebookShareButton, TwitterShareButton, WhatsappShareButton,
  FacebookIcon, TwitterIcon, WhatsappIcon
} from 'react-share';
import { Instagram, Download } from 'lucide-react';
import { generateResultImage } from './ResultImage';

interface ShareButtonsProps {
  url: string;
  title: string;
  hashtags: string[];
  result: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, hashtags, result }) => {
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    setImageUrl(generateResultImage(result));
  }, [result]);

  const instagramShareUrl = `https://www.instagram.com/`;
  const instagramCaption = encodeURIComponent(`${title} ${hashtags.map(tag => `#${tag}`).join(' ')} Check it out: ${url}`);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'hogwarts-house-result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const buttonClass = "transition-opacity duration-300 ease-in-out hover:opacity-70";

  return (
    <div className="flex justify-center space-x-4 mt-6 mb-8">
      <div className={buttonClass}>
        <FacebookShareButton url={url} title={title} hashtag={hashtags[0]}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
      <div className={buttonClass}>
        <TwitterShareButton url={url} title={title} hashtags={hashtags}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>
      <div className={buttonClass}>
        <WhatsappShareButton url={url} title={title} separator=":: ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>
      <a 
        href={`${instagramShareUrl}?caption=${instagramCaption}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 transition-colors transition-opacity duration-300 ease-in-out hover:opacity-70"
      >
        <Instagram size={20} color="white" />
      </a>
      <button 
        onClick={handleDownload} 
        className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
        aria-label="Download result image"
      >
        <Download size={20} color="white" />
      </button>
    </div>
  );
};

export default ShareButtons;