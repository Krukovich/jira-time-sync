// libraries
import React, { useState, useRef } from "react";
// interfaces
import { IUser } from "@shared/types";
// hooks
import { useTranslation } from "react-i18next";

interface Props {
  user: IUser;
  onClose: () => void;
  onSaved: (user: IUser) => void;
}

const MAX_FILE_SIZE = 500 * 1024;

const EditProfileModal = ({ user, onClose, onSaved }: Props) => {
  const { t } = useTranslation();

  const [displayName, setDisplayName] = useState<string>(user.displayName);
  const [role, setRole] = useState<string>(user.role);
  const [avatarBase64, setAvatarBase64] = useState<string | null>(user.avatarBase64);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Только изображения");

      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("Максимальный размер — 500 KB");

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setAvatarBase64(reader.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await window.api.auth.updateProfile({
        userId: user.id,
        displayName: displayName || undefined,
        role: role || undefined,
        avatarBase64,
      });
      if (!res.ok) {
        setError(res.error ?? "Ошибка сохранения");

        return;
      }
      onSaved(res.user as IUser);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(5, 8, 12, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: 440,
          background: "var(--bg-panel)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ fontSize: 18 }}> {t("profile.editProfile")}</h2>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: 100,
              height: 100,
              borderRadius: "50%",
              background: avatarBase64 ? "transparent" : "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              overflow: "hidden",
              border: "2px dashed var(--border)",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            {avatarBase64 ? (
              <img
                src={avatarBase64}
                alt="avatar"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: 32, color: "white" }}>+</span>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            {t("profile.clickToUpload")}
          </div>
          {avatarBase64 && (
            <button
              onClick={() => setAvatarBase64(null)}
              style={{
                fontSize: 11,
                color: "var(--danger)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {t("profile.clickToDeleteAvatar")}
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            {t("profile.name")}
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input"
            placeholder="Как к вам обращаться"
          />
          <label style={{ fontSize: 12, color: "var(--text-secondary)" }}>
            {t("profile.role")}
          </label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="input"
            placeholder="Какая ваша роль"
          />
        </div>

        {error && (
          <div
            style={{
              padding: 10,
              background: "rgba(248, 81, 73, 0.1)",
              border: "1px solid var(--danger)",
              borderRadius: 6,
              color: "var(--danger)",
              fontSize: 13,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--text-primary)",
            }}
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            style={{
              padding: "10px 20px",
              background: "var(--accent)",
              color: "white",
              borderRadius: 6,
              fontWeight: 600,
              cursor: loading ? "wait" : "pointer",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Сохранение..." : t("common.save")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
