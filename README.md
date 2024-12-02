# ITinaBox Status Screen

This project is a status screen for the ITinaBox system managed by the NZ Red Cross Emergency Response Unit (ERU). The code creates a web interface designed to be displayed on a Raspberry Pi.

## Overview

The status screen provides real-time monitoring and status updates for various components of the ITinaBox system, including network connectivity, server status, and environmental conditions.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Vite**: A build tool that provides a fast development environment.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **Prometheus**: An open-source monitoring and alerting toolkit.
- **Ansible**: An open-source automation tool for configuration management, application deployment, and task automation.

## Features

- **Network Status**: Monitors internet connectivity, firewall, router, Proxmox server, and ILO.
- **Server Status**: Monitors the status of the Proxmox server.
- **Environment Status**: Monitors the status of the UPS and temperature sensors.

## Setup and Deployment

### Prerequisites

- Docker and Docker Compose installed on the Raspberry Pi.
- Ansible installed on your local machine.

### Configuration

1. **Environment Variables**: Configure environment variables in the `config.json` file located in the `src` directory.

   ```json
   {
     "NATIONAL_SOCIETY_NAME": "NZ Red Cross"
   }
