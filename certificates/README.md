# Certificates Directory

Store all your certificate files (PDFs, JPGs, or PNGs) here.

### Suggested File Naming:
- `cisco-python-certificate.pdf`
- `nptel-cloud-computing.pdf`
- `ieee-icriset-2025.pdf`

### How to link a certificate in `index.html`:
Inside any `.cert-card` in `index.html`, add:
```html
<a href="certificates/your-certificate-name.pdf" target="_blank" rel="noopener noreferrer" class="cert-link">
    <i class="fas fa-file-pdf"></i> View Certificate
</a>
```
When your site is hosted on GitHub Pages, the certificate will be publicly viewable directly at:
`https://roshini075.github.io/portfolio/certificates/your-certificate-name.pdf`
