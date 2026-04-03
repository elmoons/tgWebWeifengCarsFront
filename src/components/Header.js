import { useNavigate } from "react-router-dom";

function Header({ title, showBack = true }) {
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "15px"
        }}>
            {showBack && (
                <div
                    style={{
                        cursor: "pointer",
                        marginRight: "15px",
                        fontSize: "18px",
                        fontWeight: "bold",
                        userSelect: "none"
                    }}
                    onClick={() => navigate(-1)}
                >
                    ←
                </div>
            )}
            <div style={{ fontSize: "20px", fontWeight: "bold" }}>
                {title}
            </div>
        </div>
    );
}

export default Header;