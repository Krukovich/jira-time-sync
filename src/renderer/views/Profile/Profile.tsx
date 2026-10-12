// libraries
import React, { useEffect, useState } from "react";
// components
import Avatar from "@renderer/components/common/Avatar/Avatar";
import StatCard from "@renderer/components/StatCard/StatCard";
import EditProfileModal from "@renderer/components/EditProfileModal/EditProfileModal";
// interfaces
import { IUser } from "@shared/types";
// utils
import { mockProfile } from "@renderer/mocks/data";
import { formatHM, formatName } from "@renderer/utils/format";

const Profile = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    const fetchUserData = async () => {
      try {
        const res = await window.api.auth.checkSession();

        if (!isCancelled) {
          if (res.authenticated && res.user) {
            setUser(res.user as IUser);
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchUserData();

    return () => {
      isCancelled = true;
    };
  }, []);

  const handleLogout = async () => {
    await window.api.auth.logout();
    window.location.reload();
  };

  if (loading) return <div style={{ padding: 24 }}>Загрузка...</div>;

  if (!user) {
    return <div style={{ padding: 24 }}>Пользователь не авторизован</div>;
  }

  return (
    <div className="content-scroll" style={{ maxWidth: 720 }}>
      <h1 style={{ fontSize: 20, marginBottom: 20 }}>👤 Профиль</h1>

      <div
        className="card"
        style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 16 }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 600,
            color: "white",
          }}
        >
          {user.avatarBase64 ? (
            <Avatar url={user.avatarBase64} />
          ) : (
            formatName(user.displayName ?? user.email)
          )}
        </div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600 }}>{user.displayName ?? user.email}</div>
          <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>
            {user.role ?? "user"}
          </div>
          <div
            className="mono"
            style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 6 }}
          >
            {user.email}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <button
          onClick={() => setEditing(true)}
          className="btn-secondary"
          style={{
            padding: "8px 16px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 6,
            color: "var(--text-primary)",
          }}
        >
          Редактировать
        </button>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}
      >
        <StatCard label="Всего часов" value={formatHM(mockProfile.stats.totalHours * 3600)} />
        <StatCard label="Задач закрыто" value={String(mockProfile.stats.tasksClosed)} />
        <StatCard label="Среднее в день" value={`${mockProfile.stats.avgPerDay}ч`} />
      </div>

      <div className="card">
        <div className="card-title">🔌 ПОДКЛЮЧЕНИЕ JIRA</div>
        <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: 12, fontSize: 13 }}>
          <span style={{ color: "var(--text-secondary)" }}>URL</span>
          <span className="mono">{mockProfile.jiraUrl}</span>
          <span style={{ color: "var(--text-secondary)" }}>Аккаунт</span>
          <span>{user.email}</span>
          <span style={{ color: "var(--text-secondary)" }}>Дата регистрации</span>
          <span>{new Date(mockProfile.joinedAt).toLocaleDateString("ru-RU")}</span>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="btn-secondary"
        style={{
          marginTop: "14px",
          padding: "8px 16px",
          background: "var(--danger)",
          border: "1px solid var(--border)",
          borderRadius: 6,
          color: "var(--text-primary)",
        }}
      >
        Выйти
      </button>

      {editing && (
        <EditProfileModal
          user={user}
          onClose={() => setEditing(false)}
          onSaved={(updated) => {
            setUser(updated);
            setEditing(false);
          }}
        />
      )}
    </div>
  );
};

export default Profile;
