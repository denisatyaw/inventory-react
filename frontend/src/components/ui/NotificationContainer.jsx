import React from 'react';

const NotificationContainer = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 min-w-[320px] max-w-md">
      {children}
    </div>
  );
};

export default NotificationContainer;