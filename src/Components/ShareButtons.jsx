import React from 'react';
import { FaWhatsapp, FaTelegram, FaTwitter, FaFacebook, FaImage } from 'react-icons/fa';
import LaunchButton from './modal/LaunchButton';

const ShareButtons = ({ url, title, onShareImage }) => {
  const encodedUrl = encodeURIComponent(url || window.location.href);
  const encodedTitle = encodeURIComponent(title || 'Support the Child of Hope Campaign');

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: FaWhatsapp,
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      name: 'Telegram',
      icon: FaTelegram,
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'X (Twitter)',
      icon: FaTwitter,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      color: 'bg-black hover:bg-gray-800'
    },
    {
      name: 'Facebook',
      icon: FaFacebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-[#1877f2] hover:bg-[#1666d8]'
    }
  ];

  return (
    <div className="flex flex-col items-center space-y-3">
      <p className="text-sm font-medium text-gray-700">Share this campaign</p>
      <div className="flex flex-wrap justify-center gap-2">
        {shareLinks.map(({ name, icon: Icon, url, color }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full text-white transition-colors ${color}`}
            title={`Share on ${name}`}
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
        {onShareImage && (
          <button
            onClick={onShareImage}
            className="p-2 rounded-full text-white transition-colors bg-purple-500 hover:bg-purple-600"
            title="Share Receipt Image"
          >
            <FaImage className="w-5 h-5" />
          </button>
        )}
      </div>
      {/* <LaunchButton button className={`mx-auto`} /> */}
    </div>
  );
};

export default ShareButtons; 