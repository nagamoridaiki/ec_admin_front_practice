import { NextPage } from 'next';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { ProductDetailTemplate } from '@/components/templates/ProductDetailTemplate/index';

const ProductDetailPage: NextPage = () => {
  const [productId, setProductId] = useState<number | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const validateAndSetProductId = useCallback((id: string | string[] | undefined) => {
    if (id) {
      const numericProductId = Number(id);
      if (isNaN(numericProductId)) {
        console.error('Invalid product ID');
        setProductId(null);
      } else {
        setProductId(numericProductId);
      }
    }
  }, []);

  useEffect(() => {
    validateAndSetProductId(id);
  }, [id, validateAndSetProductId]);

  return productId !== null ? <ProductDetailTemplate productId={productId} /> : <div>Invalid product ID</div>;
};

export default ProductDetailPage;