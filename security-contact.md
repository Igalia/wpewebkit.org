---
layout: page
title: "Security Contacts and Reporting"
description: "How to report a security vulnerability in WPE WebKit, and our security process."
tags: [security]
data: { dateless: "true" }
permalink: /security/contact.html
htmlSitemapOrder: -1
htmlSitemapTitle: "Security Contacts and Reporting"
sitemapChangeFrequency: yearly
sitemapPriority: 0.5
---
<header class="page">

# {{ title }}

This page describes how to report a security vulnerability in WPE WebKit. If you need technical support for a product that uses WPE WebKit, contact the manufacturer of that product directly.

WPE WebKit, Apple WebKit, WebKitGTK and Bun are all projects that rely on shared WebKit code. The WPE WebKit project does not provide a comprehensive list of such projects, but before proceeding please confirm which ports are affected by your report. If you are unsure, the WebKit Security Group can help you.

</header>

<section>

## Reporting an active threat

This first section is about active threats only; for other threats, please see the next section. Active threats include:

- discovery or evidence of a real exploit chain targeting a product that uses WPE WebKit
- attacks on WPE WebKit infrastructure
- evidence of malicious code in the release infrastructure of WPE WebKit
- active attacks against WebKit developers or manufacturers
- supply chain attacks

Theoretical or unexploited vulnerabilities are not active threats, and should follow the reporting steps in the next section.

Report active threats to the individual manufacturers of the affected products, or to individual open source distributors.

If your findings affect currently supported versions of WPE WebKit, the WebKit Security Group would greatly appreciate your report using the instructions below as well. The WebKit Security Group and WPE WebKit project do not provide a centralized reporting platform, do not maintain an exhaustive list of manufacturers, and cannot take responsibility for forwarding such a report to the [ENISA Single Reporting Platform](https://www.enisa.europa.eu/topics/product-security/single-reporting-platform-srp). These reports are still valuable for the project, and we will assist in any way we can.

Many manufacturers use WPE WebKit in a context with reduced threat exposure, such as by only displaying trusted first-party content. Please confirm that your threat disclosure affects their products before reporting it to them.

Consider limiting the scope of your disclosure if:

- it might risk your personal safety, the safety of others, or reveal the identity of a confidential source
- it concerns a state-sponsored threat
- it includes a malicious or weaponized payload for analysis, such as a production exploit toolkit

If you are a manufacturer and would like to discuss receiving reports from the WPE WebKit project, email [security@igalia.com](mailto:security@igalia.com).

</section>

<section>

## Reporting a security issue

To report a security issue, follow the steps in the [WebKit Security Policy](https://webkit.org/security-policy/).

The WebKit Security Group, whose members include Igalia developers, receives these reports. It may choose to share them with other affected projects but cannot take responsibility for notifying all affected projects.

Please say which ports, projects or products your findings affect. The same vulnerability often affects more than one port, such as both WPE WebKit and WebKitGTK.

</section>

<section>

## Supported versions

WPE WebKit has a supported-versions policy: [WebKitGTK and WPE WebKit Security Updates](https://docs.webkit.org/Ports/WebKitGTK%20and%20WPE%20WebKit/SecurityUpdates.html).

Individual manufacturers and projects may publish their own security update policy and maintain their own backports. Report a vulnerability in one of those versions directly to that manufacturer or project if it does not also affect a currently supported version.

</section>

<section>

## How advisories are published

The WPE WebKit project discloses fixes through the [WebKitGTK and WPE WebKit Security Advisories](/security/), compiled from the advisories in each release, and an [advisory feed](/security.xml). See the [WebKitGTK and WPE WebKit Security Updates](https://docs.webkit.org/Ports/WebKitGTK%20and%20WPE%20WebKit/SecurityUpdates.html) policy for more details.

When the project learns of an actively exploited vulnerability in WPE WebKit, or of a severe incident affecting the infrastructure we provide for its development, we tell users about the vulnerability or incident via the [security advisories](/security/) page and its [feed](/security.xml).

The WPE WebKit project does not notify manufacturers or users directly. If you distribute WPE WebKit and would like to discuss being notified, email [security@igalia.com](mailto:security@igalia.com).

</section>

<section>

## Our cybersecurity policy

[Igalia](https://www.igalia.com/) is one of many maintainers of the WPE WebKit and WebKitGTK ports, and supports their development as free and open source software on a sustained basis.

WPE WebKit is developed upstream as part of [the WebKit project](https://webkit.org/), following that project's cybersecurity policy, available on the [WebKit Security Policy](https://webkit.org/security-policy/) page.

Igalia does not issue an EU declaration of conformity, affix a CE marking, or supply technical documentation at this time. If you need help with this, contact Igalia directly.

Several other organizations support the development of WPE WebKit and WebKitGTK, or redistribute them. We do not maintain a comprehensive list of these organizations.

If you have any questions about Igalia's cybersecurity policy for WPE WebKit, email [security@igalia.com](mailto:security@igalia.com).

</section>
