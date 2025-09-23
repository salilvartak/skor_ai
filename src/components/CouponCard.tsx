import React from "react";
import { Link } from "react-router-dom";

interface CouponCardProps {
  id: string;
  title: string;
  image: string;
}

export const CouponCard = ({ id, title, image }: CouponCardProps) => {
  return (
    <Link to={`/coupons/${id}`} className="block">
      <div
        className="relative w-full aspect-square overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
        style={{
          backgroundColor: "var(--card-background-color, #FFFFFF)",
          borderRadius: "0.75rem",
          border: "0px solid rgba(255, 255, 255, 0.1)",
          maskImage: "url(/assets/Mask/Subtract.png)",
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskImage: "url(/assets/Mask/Subtract.png)",
          WebkitMaskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover p-16"
          />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <h3 className="text-xl font-bold text-accent/70 transition-colors duration-300 opacity-0 group-hover:opacity-100">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
};
