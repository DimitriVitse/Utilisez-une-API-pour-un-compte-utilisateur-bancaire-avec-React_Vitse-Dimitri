import React from 'react';
import './Features.css';
import FeaturesService from '@/_Services/Features.services.js';


const Features = () => {
    return (
        <section className="features">
            {
                FeaturesService.GetInfos().map((infos) =>

                    <div key={infos.id} className="feature-item">
                        <img src={infos.picture} alt="Icon" className="feature-icon" />
                        <h3 className="feature-item-title">{infos.title}</h3>
                        <p>
                            {infos.infos}
                        </p>
                    </div>

                )
            }
        </section>
    );
};

export default Features;