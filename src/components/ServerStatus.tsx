import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import StatusItem from './StatusItem'; // Import the StatusItem component

interface Status {
  proxmox: boolean;
}

const ServerStatus: React.FC = () => {
  const [status, setStatus] = useState<Status>({
    proxmox: false,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const proxmoxResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<PROXMOX_SERVER_IP>"}' }
        });

        setStatus({
          proxmox: proxmoxResponse.data.data.result[0]?.value[1] === '1',
        });
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // Fetch every 15 seconds

    return () => clearInterval(interval);
  }, []);

  const overallStatus = Object.values(status).every((value) => value);

  return (
    <div className="widget">
      <div className={`widget-header ${overallStatus ? 'status-ok' : 'status-error'}`}>
        <h2>Server Status</h2>
      </div>
      <StatusItem icon={faServer} label="Proxmox Server" status={status.proxmox} />
    </div>
  );
};

export default ServerStatus;