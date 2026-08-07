import http.server
import socketserver
import urllib.request
import json
import sys

PORT = 8080
NVIDIA_API_KEY = "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"
NVIDIA_ENDPOINT = "https://integrate.api.nvidia.com/v1/chat/completions"

class PortfolioProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_POST(self):
        if self.path == '/api/chat':
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)

            req = urllib.request.Request(
                NVIDIA_ENDPOINT,
                data=post_data,
                headers={
                    'Authorization': f'Bearer {NVIDIA_API_KEY}',
                    'Content-Type': 'application/json'
                },
                method='POST'
            )

            try:
                with urllib.request.urlopen(req) as response:
                    res_body = response.read()
                    self.send_response(200)
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(res_body)
            except Exception as e:
                self.send_response(500)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            super().do_POST()

if __name__ == "__main__":
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), PortfolioProxyHandler) as httpd:
        print(f"🚀 Portfolio Server & NVIDIA NIM LLM Proxy listening on http://localhost:{PORT}")
        sys.stdout.flush()
        httpd.serve_forever()
