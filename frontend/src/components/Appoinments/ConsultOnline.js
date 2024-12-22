import React, { useEffect } from 'react';

const ConsultOnline = () => {

  useEffect(() => {
    const initJitsi = () => {
      const domain = 'meet.jit.si';
      const options = {
        roomName: 'MyCustomRoomName',
        width: '100%',
        height: 700,
        parentNode: document.getElementById('jitsi-container'),
        userInfo: {
          displayName: 'Your Name',
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      api.addEventListener('readyToClose', () => {
        console.log('Meeting ended');
      });
    };

    // Check if the Jitsi API is available and initialize the meeting
    if (window.JitsiMeetExternalAPI) {
      initJitsi();
    } else {
      console.error('JitsiMeetExternalAPI is not available');
    }
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold" style={{marginLeft:"30%", marginTop:"2.5%"}}><b>Joining the Video Conference</b></h1>
      <div id="jitsi-container" className="mt-5" />
    </div>
  );
};

export default ConsultOnline;