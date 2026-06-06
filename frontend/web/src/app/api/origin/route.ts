import { NextResponse } from 'next/server'
import os from 'os'

export async function GET() {
    const port = process.env.FRONTEND_PORT || '7000'

    // 1. Try to detect if an ngrok tunnel is active for port 7000
    try {
        const response = await fetch('http://localhost:4040/api/tunnels', { signal: AbortSignal.timeout(1000) })
        if (response.ok) {
            const data = await response.json()
            // Find a tunnel that is forwarding to the Next.js web application (port 7000)
            const webTunnel = data.tunnels?.find((t: any) => 
                t.config?.addr?.includes('7000') || 
                t.config?.addr === '7000'
            )
            if (webTunnel && webTunnel.public_url) {
                return NextResponse.json({ origin: webTunnel.public_url })
            }
        }
    } catch (e) {
        // ngrok local API not running or unreachable
    }

    // 2. Fallback to dynamically resolving the local LAN IP address of the server
    const networkInterfaces = os.networkInterfaces()
    let fallbackIp = 'localhost'

    for (const interfaceName in networkInterfaces) {
        // Ignore docker and virtual bridge interfaces
        if (
            interfaceName.startsWith('docker') || 
            interfaceName.startsWith('br-') || 
            interfaceName.startsWith('veth') || 
            interfaceName.startsWith('lo')
        ) {
            continue
        }

        const interfaces = networkInterfaces[interfaceName] || []
        for (const iface of interfaces) {
            if (iface.family === 'IPv4' && !iface.internal) {
                // Immediately return if we find a physical Wi-Fi/Ethernet interface (starts with wl, en, eth)
                if (
                    interfaceName.startsWith('wl') || 
                    interfaceName.startsWith('en') || 
                    interfaceName.startsWith('eth')
                ) {
                    return NextResponse.json({ origin: `http://${iface.address}:${port}` })
                }
                fallbackIp = iface.address
            }
        }
    }

    return NextResponse.json({ origin: `http://${fallbackIp}:${port}` })
}
