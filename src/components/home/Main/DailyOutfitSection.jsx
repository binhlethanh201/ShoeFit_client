import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { styleData } from "../../../data/mockData";

const DailyOutfitSection = () => {
  const dailyOutfits = useMemo(() => {
    const allStyles = [];
    Object.keys(styleData).forEach((gender) => {
      Object.keys(styleData[gender]).forEach((occasion) => {
        styleData[gender][occasion].forEach((item, index) => {
          allStyles.push({
            ...item,
            gender,
            occasion,
            styleId: `${gender}_${occasion}_${index + 1}`,
          });
        });
      });
    });

    const vnTime = Date.now() + 7 * 60 * 60 * 1000;
    const daysSinceEpoch = Math.floor(vnTime / 86400000);

    let currentSeed = daysSinceEpoch;
    const random = () => {
      let x = Math.sin(currentSeed++) * 10000;
      return x - Math.floor(x);
    };

    const selected = [];
    const tempStyles = [...allStyles];
    const itemsToShow = Math.min(7, tempStyles.length);

    for (let i = 0; i < itemsToShow; i++) {
      const randomIndex = Math.floor(random() * tempStyles.length);
      selected.push(tempStyles.splice(randomIndex, 1)[0]);
    }

    return selected;
  }, []);

  const heroOutfit = dailyOutfits[0];
  const colNewOutfits = dailyOutfits.slice(1, 3);
  const col1Outfits = dailyOutfits.slice(3, 5);
  const col2Outfits = dailyOutfits.slice(5, 7);

  return (
    <div className="product-section py-5 position-relative overflow-hidden mb-5">
      <style>
        {`
          .genz-grid {
            display: grid;
            grid-template-columns: 1.8fr 1fr 1fr 1fr;
            gap: 16px;
          }
          
          .hero-col {
            aspect-ratio: 1 / 1.1; 
            display: flex;
            justify-content: flex-start;
          }
          
          .small-col {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .small-col.stagger-light {
             padding-top: 24px;
          }

          .small-col.stagger {
            padding-top: 48px;
          }

          .genz-item {
            position: relative;
            border-radius: 20px;
            overflow: hidden;
            cursor: pointer;
            background: #eee;
            display: block;
          }
          
          .hero-col .genz-item {
            height: 100%;
            width: 97%;
          }

          .small-col .genz-item {
            flex: 1; 
            height: 100%;
          }
          
          .genz-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center top; 
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
          }
          
          .genz-item:hover img {
            transform: scale(1.08);
          }
          
          .genz-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 40%);
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 1.5rem;
            color: white;
            opacity: 0.9;
            transition: opacity 0.3s;
          }

          .genz-badge {
            position: absolute;
            top: 1rem;
            left: 1rem;
            background: #fff;
            color: #000;
            padding: 0.4rem 1rem;
            border-radius: 50px;
            font-weight: 800;
            font-size: 0.75rem;
            text-transform: uppercase;
            box-shadow: 0 4px 15px rgba(0,0,0,0.15);
            z-index: 2;
          }
            
          .genz-badge.hot {
            background: #ff3366; 
            color: white;
          }

          @media (max-width: 1200px) {
            .hero-col .genz-item { width: 100%; } 
          }
          
          @media (max-width: 991px) {
            .genz-grid {
              grid-template-columns: 1fr 1fr 1fr; 
            }
            .hero-col {
              grid-column: span 3; 
              aspect-ratio: 2.5 / 1; 
            }
            .small-col.stagger-light { padding-top: 24px; }
            .small-col.stagger { padding-top: 48px; }
            .small-col {
              height: 400px; 
            }
          }
          
          @media (max-width: 768px) {
            .genz-grid {
              grid-template-columns: 1fr 1fr; 
            }
            .hero-col {
              grid-column: span 2; 
              aspect-ratio: 16 / 9; 
            }
            .small-col.stagger-light { padding-top: 32px; }
            .small-col {
              height: 450px; 
            }
            .genz-grid > .small-col:last-child {
              grid-column: span 2;
              flex-direction: row; 
              height: 220px; 
              padding-top: 0; 
            }
          }
          
          @media (max-width: 576px) {
            .hero-col { aspect-ratio: 4 / 3; }
            .small-col { height: 350px; }
            .small-col.stagger-light { padding-top: 20px; }
            .genz-grid > .small-col:last-child {
              height: 180px; 
            }
            .genz-overlay { padding: 1rem; }
          }
        `}
      </style>

      <div className="container mt-3">
        <div className="row mb-5 align-items-center">
          <div className="col-md-6">
            <h2 className="section-title">Phong cách mỗi ngày</h2>
          </div>
          <div className="col-md-6 text-start text-md-end">
            <Link to="/styleadvisor" className="more">
              Khám phá thêm
            </Link>
          </div>
        </div>

        <div className="genz-grid">
          {heroOutfit && (
            <div className="hero-col">
              <Link
                to={`/styledetail/${heroOutfit.styleId}?gender=${heroOutfit.gender}&occasion=${heroOutfit.occasion}&shoeId=${heroOutfit.shoeId}`}
                className="genz-item shadow-sm"
              >
                <span className="genz-badge hot">🔥 Outfit Of The Day</span>
                <img
                  src={heroOutfit.src}
                  alt="Daily Hero Outfit"
                  loading="lazy"
                />
                <div className="genz-overlay">
                  <h4
                    className="fw-bolder mb-1 text-uppercase"
                    style={{ letterSpacing: "1px" }}
                  >
                    {heroOutfit.occasion}
                  </h4>
                  <p
                    className="mb-0 fw-semibold text-uppercase"
                    style={{ opacity: 0.8 }}
                  >
                    {heroOutfit.gender === "MEN" ? "Nam" : "Nữ"}
                  </p>
                </div>
              </Link>
            </div>
          )}

          <div className="small-col">
            {colNewOutfits.map((outfit, index) => (
              <Link
                key={`colNew-${index}`}
                to={`/styledetail/${outfit.styleId}?gender=${outfit.gender}&occasion=${outfit.occasion}&shoeId=${outfit.shoeId}`}
                className="genz-item shadow-sm"
              >
                <img
                  src={outfit.src}
                  alt={`Outfit new col ${index + 1}`}
                  loading="lazy"
                />
                <div className="genz-overlay">
                  <h6 className="fw-bolder mb-0 text-uppercase">
                    {outfit.occasion}
                  </h6>
                </div>
              </Link>
            ))}
          </div>

          <div className="small-col stagger-light">
            {col1Outfits.map((outfit, index) => (
              <Link
                key={`col1-${index}`}
                to={`/styledetail/${outfit.styleId}?gender=${outfit.gender}&occasion=${outfit.occasion}&shoeId=${outfit.shoeId}`}
                className="genz-item shadow-sm"
              >
                <img
                  src={outfit.src}
                  alt={`Outfit ${index + 1}`}
                  loading="lazy"
                />
                <div className="genz-overlay">
                  <h6 className="fw-bolder mb-0 text-uppercase">
                    {outfit.occasion}
                  </h6>
                </div>
              </Link>
            ))}
          </div>

          <div className="small-col stagger">
            {col2Outfits.map((outfit, index) => (
              <Link
                key={`col2-${index}`}
                to={`/styledetail/${outfit.styleId}?gender=${outfit.gender}&occasion=${outfit.occasion}&shoeId=${outfit.shoeId}`}
                className="genz-item shadow-sm"
              >
                {index === 0 && <span className="genz-badge">Nên Thử</span>}
                <img
                  src={outfit.src}
                  alt={`Outfit staggered ${index + 1}`}
                  loading="lazy"
                />
                <div className="genz-overlay">
                  <h6 className="fw-bolder mb-0 text-uppercase">
                    {outfit.occasion}
                  </h6>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyOutfitSection;
