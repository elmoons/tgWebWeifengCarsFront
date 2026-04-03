function ResultRow({ title, subtitle, value }) {
    return (
        <div style={{ marginBottom: "10px" }}>
            <div style={{ fontWeight: "bold" }}>{title}</div>
            {subtitle && <div style={{ fontSize: "13px", opacity: 0.7 }}>{subtitle}</div>}
            <div style={{ marginTop: "3px" }}>{value}</div>
        </div>
    );
}

export default ResultRow;