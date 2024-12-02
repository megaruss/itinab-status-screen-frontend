import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

interface StatusItemProps {
  icon: IconDefinition;
  label: string;
  status: boolean;
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, label, status }) => {
  return (
    <div className="status-item">
      <FontAwesomeIcon icon={icon} />
      <span>{label}</span>
      <span className={`badge ${status ? 'status-ok' : 'status-error'}`}>
        {status ? 'OK' : 'Error'}
        <FontAwesomeIcon icon={status ? faCheckCircle : faTimesCircle} className="badge-icon" />
      </span>
    </div>
  );
};

export default StatusItem;