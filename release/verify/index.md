---
title: Verifying Releases
layout: post
data: { dateless: "true" }
sitemapChangeFrequency: yearly
sitemapPriority: 0.4
---

WPE release tarballs are cryptographically signed and can be verified
using [PGP signatures](#pgp-signatures) (in an `.asc` file) and their
[checksums](#checksums) (in a `.sums` file). Everybody is encouraged to verify
the integrity of downloaded files using them.

## PGP Signatures

Every release is accompanied by a cryptographic signature produced by the
person in charge of publishing the release. This signature allows anyone to
check whether the files have been tampered with after they have been signed.
Forging a signature is practically impossible without gaining access to the
private key used. If that were to happen, the compromised key would be revoked
and all files re-signed with new keys.


### Keys

The following PGP keys are currently in use for signing releases:

<table>
  <thead>
    <tr><th>Developer</th><th>Fingerprint</th></tr>
  </thead>
    <tr>
      <td>Adrián Pérez de Castro (<a href="/release/verify/aperez.key">key</a>)</td>
      <td><tt>5AA3 BC33 4FD7 E336 9E7C  77B2 91C5 59DB E4C9 123B</tt></td>
    </tr>
    <tr>
      <td>Carlos García Campos (<a href="/release/verify/cgarcia.key">key</a>)</td>
      <td><tt>D7FC F61C F9A2 DEAB 31D8  1BD3 F3D3 22D0 EC45 82C3</tt></td>
    </tr>
  <tbody>
  </tbody>
</table>


### Importing keys

Once downloaded, keys need to be imported in the PGP keyring, for example with
GnuPG:

```
% gpg --import aperez.key
gpg: key 91C559DBE4C9123B: 1 signature not checked due to a missing key
gpg: key 91C559DBE4C9123B: public key "Adrián Pérez de Castro <aperez@igalia.com>" imported
gpg: key 56736249E4C9123B: 11 signatures not checked due to missing keys
gpg: key 56736249E4C9123B: public key "Adrián Pérez de Castro <aperez@igalia.com>" imported
gpg: Total number processed: 2
gpg:               imported: 2
gpg: no ultimately trusted keys found
```


### Checking

The signature file for each release has the same name plus the `.asc` suffix.
Given a download URL, the following illustrates the process:

```
% curl -sLO https://wpewebkit.org/releases/wpewebkit-2.34.3.tar.xz
% curl -sLO https://wpewebkit.org/releases/wpewebkit-2.34.3.tar.xz.asc
```

Now it is possible to verify the `.tar.xz` file against its signature:

```
% gpg --verify wpewebkit-2.34.3.tar.xz.asc
gpg: assuming signed data in 'wpewebkit-2.34.3.tar.xz'
gpg: Signature made lun 20 dic 2021 00:05:24 EET
gpg:                using DSA key 5AA3BC334FD7E3369E7C77B291C559DBE4C9123B
gpg: Good signature from "Adrián Pérez de Castro <aperez@igalia.com>" [ultimate]
gpg:                 aka "Adrián Pérez de Castro (personal) <adrian@perezdecastro.org>" [ultimate]
Primary key fingerprint: 5AA3 BC33 4FD7 E336 9E7C  77B2 91C5 59DB E4C9 123B
```


## Checksums

Checksums for release tarballs are also published along releases. While
suitable to check file integrity, using [PGP signatures](#pgp-signatures)
provide a stronger guarantee.

### Checking

The checksums file for each release has the same name plus the `.sums` suffix.
Given a download URL, the following illustrates how to calculate the SHA-256
checksum on your end:

```
% curl -sLO https://wpewebkit.org/releases/wpewebkit-2.34.3.tar.xz
% curl -sLO https://wpewebkit.org/releases/wpewebkit-2.34.3.tar.xz.sums
% sha256sum wpewebkit-2.34.3.tar.xz | cut -f1 -d' '
c35de4bfce35c81cbd6c1da27879b4ea33e20bd51d750ce296a4d100d45f40fc
```

This can be compared with the value of the last line of the `.sums` file:

```
% cat wpewebkit-2.34.3.tar.xz.sums
wpewebkit-2.34.3.tar.xz (22.5 MiB)
   md5sum: f8eb92825bf6477fb04ca017926c2458
   sha1sum: a72f507dfd6d4d579b2e6c939d7c171c2cfb1d92
   sha256sum: c35de4bfce35c81cbd6c1da27879b4ea33e20bd51d750ce296a4d100d45f40fc
```

Or, programmatically:

```
% expected=$(tail -1 wpewebkit-2.34.3.tar.xz.sums | cut -f5 -d' ')
% calculated=$(sha256sum wpewebkit-2.34.3.tar.xz | cut -f1 -d' ')
% if [ "$expected" = "$calculated" ]; then echo ok ; else echo failed ; fi
ok
```
