import { ProfileTemplate, ProfileTemplateLoading } from "@components/templates";
import { ProfileMediaGrid } from "@components/organisms";

import { useOtherProfile } from "./hooks";

export function OtherProfile() {
  const {
    userId,
    profile,
    isLoading,
    isRefreshing,
    labels,
    avatarUrl,
    coverUrl,
    handleGoBack,
    handleRefresh,
    handleCallWhatsApp,
  } = useOtherProfile();

  if (isLoading && !profile) {
    return <ProfileTemplateLoading />;
  }

  return (
    <ProfileTemplate
      isMe={false}
      isRefreshing={isRefreshing}
      onRefresh={handleRefresh}
      onGoBack={handleGoBack}
      fullName={labels.displayName}
      bio={labels.displayBio}
      avatarUrl={avatarUrl}
      coverUrl={coverUrl}
      onCallWhatsApp={handleCallWhatsApp}
      stats={{
        position: labels.displayPosition,
        city: labels.displayCity,
      }}
      details={{
        height: labels.displayHeight,
        location: labels.displayLocation,
        whatsapp: labels.displayWhatsApp,
      }}
      renderMediaGrid={() => <ProfileMediaGrid userId={userId} />}
    />
  );
}
