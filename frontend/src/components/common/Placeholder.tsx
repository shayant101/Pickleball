import React from 'react';

interface PlaceholderProps {
  section: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({ section }) => {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <div className="text-6xl mb-4">🚧</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">The {section} section is under construction</p>
      </div>
    </div>
  );
};

export default Placeholder;