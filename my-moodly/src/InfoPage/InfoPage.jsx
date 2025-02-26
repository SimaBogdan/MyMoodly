import { useState } from "react";
import "./InfoPage.css";

function InfoPage() {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const data = [
        {
            title: "Îmbunătățirea somnului",
            content: `
                Somnul este foarte important pentru sănătatea fizică și mentală, iar calitatea lui contează enorm. Un somn bun ajută inima să rămână sănătoasă, reglează energia și nivelul de zahăr din sânge, și contribuie la menținerea unei stări de bine. De asemenea, ajută creierul să funcționeze mai bine, îmbunătățind concentrarea, memoria și abilitatea de a rezolva problemele. Când dormim suficient, organismul nostru funcționează mai bine și poate să lupte împotriva răcelilor și altor probleme de sănătate.
            
            <br /><br />

            Lipsa somnului, în schimb, poate avea efecte neplăcute. Ne poate face mai obosiți, mai puțin atenți și poate crește nivelul de stres. Pe termen lung, lipsa somnului poate duce la probleme de sănătate, cum ar fi hipertensiunea, diabetul și chiar depresia.

            <br /><br />

            <strong>Cum ne putem îmbunătăți somnul?</strong>
            <p>Un program de somn regulat, adică să mergem la culcare și să ne trezim la aceleași ore în fiecare zi...</p>

            <br />

            <ul>
                <li>Exercițiile fizice: Mișcarea ajută corpul să se relaxeze mai ușor seara...</li>
                <li>Evitarea ecranelor: Lumina albastră de la telefon sau tabletă poate afecta somnul...</li>
            </ul>
            `,
        },
        {
            title: "Breaking your shell",
            content:
                "Here's more information on overcoming shyness and building confidence...",
        },
        {
            title: "Managing Stress",
            content:
                "Stress management is essential for maintaining a healthy balance in life. Here are some tips on how to manage stress effectively...",
        },
        {
            title: "Healthy Eating Habits",
            content:
                "Eating healthy is a vital part of living a long and fulfilling life. Here are some tips on how to maintain a healthy diet...",
        },
        {
            title: "Building Positive Relationships",
            content:
                "Building and maintaining positive relationships is key to emotional well-being. Learn more about how to foster these relationships...",
        },
        {
            title: "The Power of Meditation",
            content:
                "Meditation can help reduce stress and improve mental clarity. Here are some beginner-friendly techniques to get started...",
        },
        {
            title: "Time Management Tips",
            content:
                "Managing time effectively can lead to more productivity and less stress. Check out these time management strategies...",
        },
        {
            title: "Finding Your Passion",
            content:
                "Discovering your true passion can lead to a fulfilling life. Here's how you can explore and identify what excites you...",
        },
    ];

    const openModal = (index) => {
        setExpandedIndex(index);
    };

    const closeModal = () => {
        setExpandedIndex(null);
    };

    const getPreview = (htmlContent) => {
        const textContent = htmlContent.replace(/<[^>]*>?/gm, ""); // Remove HTML tags
        const slicedContent = textContent.slice(0, 100); // Adjust character limit as needed
        return slicedContent.length === textContent.length
            ? slicedContent
            : `${slicedContent}...`;
    };

    return (
        <div className="background">
            <div className="info-page">
                <div className="info-list">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="info-box"
                            onClick={() => openModal(index)}
                        >
                            <h2>{item.title}</h2>
                            <div
                                className="preview"
                                dangerouslySetInnerHTML={{
                                    __html: `<p>${getPreview(
                                        item.content
                                    )}</p>`,
                                }}
                            />
                            <p className="read-more">Read more⌄</p>
                        </div>
                    ))}
                </div>

                {expandedIndex !== null && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div
                            className="modal-content"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="close-button"
                                onClick={closeModal}
                            >
                                ✕
                            </button>
                            <h2>{data[expandedIndex].title}</h2>
                            <div
                                className="content"
                                dangerouslySetInnerHTML={{
                                    __html: data[expandedIndex].content,
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoPage;
