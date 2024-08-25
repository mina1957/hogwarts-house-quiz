import React from 'react';

export const generateResultImage = (result: string): string => {
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;

  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // Background
  ctx.fillStyle = '#1e3a8a'; // deep blue background
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#fde047'; // yellow color
  ctx.font = 'bold 60px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('My Blended Hogwarts House', canvas.width / 2, 100);

  // Result
  ctx.fillStyle = '#ffffff'; // white color
  ctx.font = 'bold 80px Arial';
  ctx.fillText(result, canvas.width / 2, canvas.height / 2);

  // Subtitle
  ctx.font = '40px Arial';
  ctx.fillText('Take the quiz to find your blend!', canvas.width / 2, canvas.height - 100);

  // Convert canvas to image URL
  return canvas.toDataURL('image/png');
};