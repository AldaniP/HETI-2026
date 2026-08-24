/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenRoute, HistoryItem, NotificationItem } from './types';
import { Layout, BottomNav } from './components/Layout';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { HistoryScreen, DEFAULT_HISTORY_DATA } from './screens/HistoryScreen';
import { HistoryDetailScreen } from './screens/HistoryDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { EduHubScreen } from './screens/EduHubScreen';
import { EduDetailScreen } from './screens/EduDetailScreen';
import { WakafDetailScreen } from './screens/WakafDetailScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { NazhirScreen } from './screens/NazhirScreen';
import { DocumentScreen } from './screens/DocumentScreen';
import { PaymentSuccessScreen } from './screens/PaymentSuccessScreen';
import { NotificationScreen, DEFAULT_NOTIFICATIONS } from './screens/NotificationScreen';
import { NotificationDetailScreen } from './screens/NotificationDetailScreen';
import { SettingScreen } from './screens/SettingScreen';
import { EditProfileScreen } from './screens/EditProfileScreen';
import { SecurityScreen } from './screens/SecurityScreen';
import { HelpCenterScreen } from './screens/HelpCenterScreen';
import { AIChatScreen } from './screens/AIChatScreen';
import { QurbanScreen } from './screens/QurbanScreen';
import { ZakatScreen } from './screens/ZakatScreen';
import { InfaqScreen } from './screens/InfaqScreen';
import { PointsScreen } from './screens/PointsScreen';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ScreenRoute>('login');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('syariah_milenial');
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem>(DEFAULT_HISTORY_DATA[0]);
  const [selectedNotification, setSelectedNotification] = useState<NotificationItem>(DEFAULT_NOTIFICATIONS[0]);

  const renderScreen = () => {
    switch (currentRoute) {
      case 'login': return <LoginScreen navigate={setCurrentRoute} />;
      case 'register': return <RegisterScreen navigate={setCurrentRoute} />;
      case 'home': return <HomeScreen navigate={setCurrentRoute} setSelectedArticleId={setSelectedArticleId} />;
      case 'catalog': return <CatalogScreen navigate={setCurrentRoute} />;
      case 'history': return <HistoryScreen navigate={setCurrentRoute} onSelectItem={setSelectedHistoryItem} />;
      case 'history_detail': return <HistoryDetailScreen navigate={setCurrentRoute} item={selectedHistoryItem} />;
      case 'profile': return <ProfileScreen navigate={setCurrentRoute} />;
      case 'edu_hub': return <EduHubScreen navigate={setCurrentRoute} setSelectedArticleId={setSelectedArticleId} />;
      case 'edu_detail': return <EduDetailScreen navigate={setCurrentRoute} articleId={selectedArticleId} />;
      case 'wakaf_detail': return <WakafDetailScreen navigate={setCurrentRoute} />;
      case 'payment': return <PaymentScreen navigate={setCurrentRoute} />;
      case 'nazhir': return <NazhirScreen navigate={setCurrentRoute} />;
      case 'document': return <DocumentScreen navigate={setCurrentRoute} />;
      case 'payment_success': return <PaymentSuccessScreen navigate={setCurrentRoute} />;
      case 'notification': return <NotificationScreen navigate={setCurrentRoute} onSelectNotification={setSelectedNotification} />;
      case 'notification_detail': return <NotificationDetailScreen navigate={setCurrentRoute} notification={selectedNotification} />;
      case 'setting': return <SettingScreen navigate={setCurrentRoute} />;
      case 'edit_profile': return <EditProfileScreen navigate={setCurrentRoute} />;
      case 'security': return <SecurityScreen navigate={setCurrentRoute} />;
      case 'help_center': return <HelpCenterScreen navigate={setCurrentRoute} />;
      case 'ai_chat': return <AIChatScreen navigate={setCurrentRoute} />;
      case 'qurban': return <QurbanScreen navigate={setCurrentRoute} />;
      case 'zakat': return <ZakatScreen navigate={setCurrentRoute} />;
      case 'infaq': return <InfaqScreen navigate={setCurrentRoute} />;
      case 'points': return <PointsScreen navigate={setCurrentRoute} />;
      default: return <LoginScreen navigate={setCurrentRoute} />;
    }
  };

  return (
    <Layout>
      {renderScreen()}
      <BottomNav currentRoute={currentRoute} navigate={setCurrentRoute} />
    </Layout>
  );
}

