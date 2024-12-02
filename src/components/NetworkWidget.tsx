import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faGlobe, faShieldAlt, faRoute, faServer, faNetworkWired } from '@fortawesome/free-solid-svg-icons';
import StatusItem from './StatusItem'; // Import the StatusItem component

interface Status {
  internet: boolean;
  firewall: boolean;
  router: boolean;
  proxmox: boolean;
  ilo: boolean;
}

const NetworkWidget: React.FC = () => {
  const [status, setStatus] = useState<Status>({
    internet: false,
    firewall: false,
    router: false,
    proxmox: false,
    ilo: false,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const internetResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://one.one.one.one"}' }
        });
        const firewallResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<FIREWALL_IP>"}' }
        });
        const routerResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<ROUTER_IP>"}' }
        });
        const proxmoxResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<PROXMOX_SERVER_IP>"}' }
        });
        const iloResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<ILO_IP>"}' }
        });

        setStatus({
          internet: internetResponse.data.data.result[0]?.value[1] === '1',
          firewall: firewallResponse.data.data.result[0]?.value[1] === '1',
          router: routerResponse.data.data.result[0]?.value[1] === '1',
          proxmox: proxmoxResponse.data.data.result[0]?.value[1] === '1',
          ilo: iloResponse.data.data.result[0]?.value[1] === '1',
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
        <h2>Network Status</h2>
      </div>
      <StatusItem icon={faGlobe} label="Internet Connectivity" status={status.internet} />
      <StatusItem icon={faShieldAlt} label="Firewall" status={status.firewall} />
      <StatusItem icon={faRoute} label="Router" status={status.router} />
      <StatusItem icon={faServer} label="Proxmox Server" status={status.proxmox} />
      <StatusItem icon={faNetworkWired} label="ILO" status={status.ilo} />
    </div>
  );
};

export default NetworkWidget;