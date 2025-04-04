
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Cyberpunk theme colors
				cyber: {
					black: '#0a0a0f',
					dark: '#1A1F2C',
					purple: {
						DEFAULT: '#9b87f5',
						light: '#c4b8fa',
						dark: '#7E69AB'
					},
					blue: {
						DEFAULT: '#1EAEDB',
						dark: '#0FA0CE',
						neon: '#00f3ff'
					},
					pink: {
						DEFAULT: '#f700ff',
						light: '#ff60fb'
					},
					yellow: {
						DEFAULT: '#f7f700',
						neon: '#ccff00'
					},
					green: {
						DEFAULT: '#00ff66',
						dark: '#00cc52'
					}
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'neon-pulse': {
					'0%, 100%': {
						opacity: '1',
						filter: 'brightness(1) drop-shadow(0 0 5px var(--neon-color))'
					},
					'50%': {
						opacity: '0.8',
						filter: 'brightness(1.2) drop-shadow(0 0 10px var(--neon-color))'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'ripple': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0.5'
					},
					'100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'cityscape': {
					'0%': {
						backgroundPosition: '0% 0%'
					},
					'100%': {
						backgroundPosition: '100% 0%'
					}
				},
				'glitch': {
					'0%, 100%': {
						clipPath: 'inset(0 0 0 0)'
					},
					'20%': {
						clipPath: 'inset(33% 0 66% 0)'
					},
					'40%': {
						clipPath: 'inset(66% 0 33% 0)'
					},
					'60%': {
						clipPath: 'inset(33% 0 66% 0)'
					},
					'80%': {
						clipPath: 'inset(66% 0 33% 0)'
					}
				},
				'scanning': {
					'0%': {
						backgroundPosition: '0% 0%'
					},
					'100%': {
						backgroundPosition: '0% 100%'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'neon-pulse': 'neon-pulse 2s infinite',
				'float': 'float 3s ease-in-out infinite',
				'ripple': 'ripple 1s linear forwards',
				'cityscape': 'cityscape 60s linear infinite',
				'glitch': 'glitch 1s linear infinite',
				'scanning': 'scanning 2s linear infinite'
			},
			boxShadow: {
				'neon-blue': '0 0 5px #00f3ff, 0 0 10px rgba(0, 243, 255, 0.8)',
				'neon-purple': '0 0 5px #f700ff, 0 0 10px rgba(247, 0, 255, 0.8)',
				'neon-green': '0 0 5px #00ff66, 0 0 10px rgba(0, 255, 102, 0.8)',
				'neon-yellow': '0 0 5px #f7f700, 0 0 10px rgba(247, 247, 0, 0.8)'
			},
			backgroundImage: {
				'cyber-grid': 'radial-gradient(#00f3ff 1px, transparent 1px), radial-gradient(#00f3ff 1px, transparent 1px)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'cityscape': "url('/images/cyberpunk-cityscape.jpg')",
			},
			backgroundSize: {
				'cyber-grid': '30px 30px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
