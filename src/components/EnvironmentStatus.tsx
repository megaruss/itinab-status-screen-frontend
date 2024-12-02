import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faThermometerHalf, faBatteryHalf } from '@fortawesome/free-solid-svg-icons';
import StatusItem from './StatusItem'; // Import the StatusItem component

interface Status {
  ups: boolean;
  temperature: boolean;
}

const EnvironmentStatus: React.FC = () => {
  const [status, setStatus] = useState<Status>({
    ups: false,
    temperature: false,
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const upsResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<UPS_IP>"}' }
        });
        const temperatureResponse = await axios.get('http://localhost:9090/api/v1/query', {
          params: { query: 'probe_success{instance="http://<TEMPERATURE_SENSOR_IP>"}' }
        });

        setStatus({
          ups: upsResponse.data.data.result[0]?.value[1] === '1',
          temperature: temperatureResponse.data.data.result[0]?.value[1] === '1',
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
        <h2>Environment Status</h2>
      </div>
      <StatusItem icon={faBatteryHalf} label="UPS" status={status.ups} />
      <StatusItem icon={faThermometerHalf} label="Temperature" status={status.temperature} />
    </div>
  );
};

export default EnvironmentStatus;