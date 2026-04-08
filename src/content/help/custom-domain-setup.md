---
title: "Step-by-step Guide to Connecting Your Custom Domain to BuildRail Site Engine"
description: "Learn how to seamlessly link your custom domain to the BuildRail Site Engine."
readTime: "5 min read"
---

## Introduction

Connecting your custom domain, such as `yourname.com`, to your BuildRail Site Engine allows you to maintain a professional online presence. Follow these precise steps to ensure a smooth setup.

## Step-by-Step Instructions

### Step 1: Prepare Your Domain

1. **Purchase a Domain**: Ensure you have a domain registered with a domain provider (e.g., GoDaddy, Namecheap).

2. **Access Domain Settings**: Log in to your domain provider's account and navigate to the DNS (Domain Name System) settings.

### Step 2: Configure DNS Records

1. **Add an A Record**:
   - **Host**: Enter `@` to point the domain directly.
   - **Points to**: Enter the BuildRail IP address provided in your Site Engine dashboard.
   - **TTL**: Set it to `Automatic` or the lowest possible value.

2. **Add a CNAME Record** (For WWW):
   - **Host**: Enter `www`.
   - **Points to**: Enter the subdomain provided by BuildRail, often `yourname.buildrail.com`.
   - **TTL**: Set it to `Automatic` or the lowest possible value.

> **Pro Tip**: DNS changes might take up to 48 hours to propagate. Be patient and check periodically.

### Step 3: Verify Domain Connection in BuildRail

1. **Access Site Engine**: Log in to your BuildRail account and navigate to the Site Engine section.

2. **Enter Your Domain**:
   - Go to the domain settings within Site Engine.
   - Enter your custom domain (e.g., `yourname.com`).

3. **Verify Connection**:
   - Click on "Verify" or "Check Status" to ensure the domain settings are correctly configured.
   - BuildRail will confirm successful setup or provide error messages if adjustments are needed.

### Step 4: Finalize Setup

1. **Select the Primary Domain**:
   - If you added both `yourname.com` and `www.yourname.com`, choose which one you want as the primary.

2. **Secure Your Site**:
   - Enable SSL (Secure Sockets Layer) in the Site Engine settings to ensure your site is secure. This is usually a toggled feature.

> **Pro Tip**: Always use HTTPS over HTTP to enhance security and SEO performance.

### Troubleshooting

- **Propagation Delay**: If your domain hasn't connected after 48 hours, check your DNS settings for errors.
- **Incorrect IP/CNAME**: Double-check the IP address and CNAME values entered against the ones provided by BuildRail.

## Conclusion

By following these steps, your custom domain should now be successfully connected to your BuildRail Site Engine, enhancing your professional online presence. If you encounter any issues, contact BuildRail support for further assistance.