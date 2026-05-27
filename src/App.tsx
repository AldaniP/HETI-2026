/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenRoute } from './types';
import { Layout, BottomNav } from './components/Layout';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CatalogScreen } from './screens/CatalogScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { EduHubScreen } from './screens/EduHubScreen';
import { EduDetailScreen } from './screens/EduDetailScreen';
import { WakafDetailScreen } from './screens/WakafDetailScreen';
import { PaymentScreen } from './screens/PaymentScreen';
import { NazhirScreen } from './screens/NazhirScreen';
import { DocumentScreen } from './screens/DocumentScreen';
import { PaymentSuccessScreen } from './screens/PaymentSuccessScreen';
import { NotificationScreen } from './screens/NotificationScreen';
import { SettingScreen } from './screens/SettingScreen';
import { AIChatScreen } from './screens/AIChatScreen';
import { QurbanScreen } from './screens/QurbanScreen';
import { ZakatScreen } from './screens/ZakatScreen';
import { InfaqScreen } from './screens/InfaqScreen';
import { PointsScreen } from './screens/PointsScreen';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ScreenRoute>('login');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('syariah_milenial');

  const renderScreen = () => {
    switch (currentRoute) {
      case 'login': return <LoginScreen navigate={setCurrentRoute} />;
      case 'register': return <RegisterScreen navigate={setCurrentRoute} />;
      case 'home': return <HomeScreen navigate={setCurrentRoute} setSelectedArticleId={setSelectedArticleId} />;
      case 'catalog': return <CatalogScreen navigate={setCurrentRoute} />;
      case 'history': return <HistoryScreen navigate={setCurrentRoute} />;
      case 'profile': return <ProfileScreen navigate={setCurrentRoute} />;
      case 'edu_hub': return <EduHubScreen navigate={setCurrentRoute} setSelectedArticleId={setSelectedArticleId} />;
      case 'edu_detail': return <EduDetailScreen navigate={setCurrentRoute} articleId={selectedArticleId} />;
      case 'wakaf_detail': return <WakafDetailScreen navigate={setCurrentRoute} />;
      case 'payment': return <PaymentScreen navigate={setCurrentRoute} />;
      case 'nazhir': return <NazhirScreen navigate={setCurrentRoute} />;
      case 'document': return <DocumentScreen navigate={setCurrentRoute} />;
      case 'payment_success': return <PaymentSuccessScreen navigate={setCurrentRoute} />;
      case 'notification': return <NotificationScreen navigate={setCurrentRoute} />;
      case 'setting': return <SettingScreen navigate={setCurrentRoute} />;
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

