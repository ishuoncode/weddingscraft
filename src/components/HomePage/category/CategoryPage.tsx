// CategoryPage.tsx
import React from 'react';
import CategoryCard from '@/components/CategoryCard';
import Banquet1 from "../../../../public/Banquet-1.jpg";
import Banquet2 from "../../../../public/Banquet-2.jpg";
import Catering from "../../../../public/cattering.jpg";
import Photographer from "../../../../public/Photographer.jpeg";

const CategoryPage: React.FC = () => {
    const categories = [
        { id: "1", src: Banquet1, alt: "Banquet", title: "Banquet Halls" },
        { id: "2", src: Banquet2, alt: "Banquet", title: "Decorators" },
        { id: "3", src: Catering, alt: "Catering", title: "Caterers" },
        { id: "4", src: Photographer, alt: "Photographer", title: "Photographers" }
    ];

    return (
        <div >
            {categories.map((category) => (
                <CategoryCard
                    key={category.id}
                    img={category.src} // Change here
                    alt={category.alt}
                    title={category.title}
                />
            ))}
        </div>
    );
}

export default CategoryPage;