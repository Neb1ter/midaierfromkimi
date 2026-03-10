import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

const defaultSEO = {
  title: '米黛尔 - 高端控糖烘焙品牌 | 甜蜜无负担，健康每一口',
  description: '米黛尔专注于高端控糖烘焙食品，为糖尿病患者、生酮饮食者和健康意识人群提供美味与健康兼得的烘焙产品。全线产品无添加蔗糖，低GI值，让您享受甜蜜无负担。',
  keywords: ['控糖烘焙', '无糖食品', '生酮食品', '低碳水', '糖尿病食品', '健康烘焙', '米黛尔'],
  ogImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&q=80',
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  canonical,
}) => {
  useEffect(() => {
    // Update title
    document.title = title || defaultSEO.title;
    
    // Update meta tags
    const metaTags = {
      'description': description || defaultSEO.description,
      'keywords': (keywords || defaultSEO.keywords).join(', '),
      'og:title': title || defaultSEO.title,
      'og:description': description || defaultSEO.description,
      'og:image': ogImage || defaultSEO.ogImage,
      'og:type': ogType,
      'twitter:title': title || defaultSEO.title,
      'twitter:description': description || defaultSEO.description,
      'twitter:image': ogImage || defaultSEO.ogImage,
    };
    
    Object.entries(metaTags).forEach(([name, content]) => {
      // Check for existing meta tag
      let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name.startsWith('og:')) {
          meta.setAttribute('property', name);
        } else if (name.startsWith('twitter:')) {
          meta.setAttribute('name', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    });
    
    // Update canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
    
    return () => {
      // Cleanup: reset to default title when component unmounts
      document.title = defaultSEO.title;
    };
  }, [title, description, keywords, ogImage, ogType, canonical]);
  
  return null;
};

export default SEO;
