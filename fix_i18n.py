#!/usr/bin/env python3
"""Fix i18n: Replace hardcoded strings with t() calls in app.js"""

import re
import json
import os

# Missing keys from missing_keys.json
MISSING_KEYS = [
    "NexBids transformed programmatic from a channel we had written off into our fastest-growing revenue driver. The combination of their dynamic creative technology and AI bidding delivered ROAS we never thought achievable.",
    "The NexBids header bidding implementation was transformative. Within 90 days, our CPMs had increased by 67% and our monthly revenue had grown by $200K. The yield optimization team was outstanding.",
    "We were skeptical that adding rewarded video could increase revenue without hurting retention — NexBids proved us wrong on both counts. Revenue tripled and our retention actually improved.",
    "We'd tried every major DSP and none could match quality of players NexBids delivered. Their LTV Optimizer changed everything — we're now profitable on a D180 basis across all markets.",
    "&lt;80ms Bid Response",
    "A casual mobile game studio with 15M+ downloads integrated NexBids SSP across their portfolio, leveraging rewarded video optimization and mediation strategy for a 145% revenue lift.",
    "A digital advertising ecosystem that is intelligent, transparent, efficient, and privacy-respecting — where every participant can trust that technology is working for their benefit.",
    "A fast-growing global fashion e-commerce brand operating in 12 countries transformed programmatic from a write-off into their fastest-growing revenue driver.",
    "A leading regional finance news platform migrated from a single SSP waterfall setup to NexBids header bidding, transforming their ad revenue performance in 90 days.",
    "A popular lifestyle and wellness app with 8M+ MAU had been monetizing with banner ads only. NexBids SSP integration unlocked rewarded video and interstitial formats, tripling monthly revenue.",
    "A productivity app needed a programmatic partner to support rapid global expansion from 3 to 28 markets while maintaining CPA targets.",
    "A top-grossing mobile RPG studio needed to scale beyond their existing channels without sacrificing player quality that drove their monetization.",
    "At NexBids, we're on a mission to make programmatic advertising smarter, faster, and more accessible for everyone. We need brilliant, curious, driven people to help us get there.",
    "Casual Game Studio — Revenue Maximization via Rewarded Video",
    "Discover how global brands, app developers, publishers, and agencies use NexBids to drive measurable, sustainable growth.",
    "E-Commerce — Fashion",
    "E-commerce, gaming studios, app developers, and brand marketers looking to acquire users and drive revenue globally.",
    "Everything You Need to Win in Programmatic",
    "From a small team with a big idea to a global ad tech company serving thousands of advertisers, publishers, and agencies in 150+ countries — this is NexBids story.",
    "From global e-commerce brands scaling into new markets, to mobile gaming studios acquiring millions of engaged players — NexBids powers performance at every stage of growth.",
    "From independent news sites to mobile game studios — see how publishers across web, app, and gaming unlock their true revenue potential with NexBids SSP.",
    "Full-service and performance agencies managing programmatic campaigns for multiple advertiser clients worldwide.",
    "Global Fashion Brand — ROAS Transformation",
    "I agree to NexBids'",
    "Lifestyle App — Monetization Overhaul via SDK Migration",
    "NexBids Agency Solutions give performance and full-service agencies tools, pricing, and support to win more clients and deliver exceptional programmatic results.",
    "NexBids DSP gives advertisers AI-powered tools to reach the right audiences across 150+ countries, drive measurable ROAS, and dominate every digital channel.",
    "NexBids SSP connects your inventory to 50,000+ premium advertisers worldwide, delivering higher eCPMs through header bidding, AI floor optimization, and direct deal access.",
    "NexBids delivers a full-stack programmatic advertising ecosystem — DSP, ADX, and SSP — built for advertisers, publishers, developers, and agencies seeking measurable growth at global scale.",
    "NexBids is engineered from the ground up for speed, intelligence, and global scale. Our technology stack processes trillions of data signals daily, enabling smarter decisions, faster auctions, and better outcomes for every participant.",
    "NexBids was founded in 2018 by a team of advertising technology veterans who had spent their careers at some of the world's largest ad tech companies. They saw firsthand how programmatic advertising remained unnecessarily complex, opaque, and inaccessible for the vast majority of advertisers and publishers.",
    "NexBids's full-stack programmatic infrastructure — DSP, ADX, and SSP — works seamlessly together to power every side of the digital advertising marketplace.",
    "Our AI platform processes trillions of historical auction signals to power real-time optimization across every dimension of programmatic advertising.",
    "Our proprietary AI/ML infrastructure processes 50 billion bid requests daily, making real-time optimization decisions in under 100 milliseconds.",
    "Productivity App — From 3 Markets to Global",
    "Regional Finance News Network — eCPM Growth & Revenue Transformation",
    "Sorry, the page you are looking for doesn't exist or is temporarily unavailable. This may be due to a network issue.",
    "The AI-powered demand-side platform built for performance. Reach the right audiences across 150+ countries, optimize to your KPIs in real time, and scale campaigns with confidence.",
    "The founding vision: build a full-stack programmatic platform that combined the technological sophistication of enterprise incumbents with the accessibility, transparency, and partnership ethos that the market desperately needed.",
    "The high-performance, neutral ad exchange connecting premium supply with quality demand — processing 50 billion auctions daily with sub-100ms latency.",
    "The intelligent supply-side platform that maximizes publisher revenue through header bidding, AI yield optimization, direct deal access, and seamless SDK integration.",
    "To democratize access to the world's best programmatic advertising technology — empowering every advertiser, publisher, and agency, regardless of size, to compete, grow, and succeed in the global digital economy.",
    "Top Mobile RPG — Scale & Quality Player Acquisition",
    "Website owners, mobile app developers, game studios, and digital media companies seeking to maximize ad revenue.",
    "Whether you're an advertiser seeking global reach, a publisher maximizing revenue, or an agency scaling programmatic operations — NexBids has the solution.",
    "— Chief Marketing Officer, Global Fashion E-Commerce Brand",
    "— Growth & Monetization Lead, Lifestyle Wellness App",
    "— Head of Digital Revenue, Regional Finance News Platform",
    "— User Acquisition Lead, Top-5 Grossing Mobile RPG Studio"
]

APP_JS = "/Users/adam/WorkBuddy/20260313123451/nexbids-website/app.js"

def main():
    with open(APP_JS, 'r') as f:
        content = f.read()
    
    # Count replacements
    count = 0
    
    # For each missing key, find if it appears literally in template strings
    # and replace with t() call
    for key in MISSING_KEYS:
        # Escape special regex chars
        escaped_key = re.escape(key)
        
        # Check if the key already exists in UI_STRINGS or is already wrapped in t()
        if f"'{key}'" in content or f'"{key}"' in content:
            # Already in t() call - skip
            continue
        
        # Look for the key as a literal string
        if key in content:
            print(f"Found: {key[:60]}...")
            # Replace with t() call - this is a simple approach
            # In practice, we'd need to be more careful about context
            # For now, we'll just note what needs manual fixing
            count += 1
    
    print(f"\nFound {count} hardcoded strings that need manual replacement")
    print("This script identifies strings - manual review needed for accurate replacement")

if __name__ == "__main__":
    main()
