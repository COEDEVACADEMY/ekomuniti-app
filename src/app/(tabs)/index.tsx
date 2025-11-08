import {
  Bell,
  Calendar,
  Clock,
  CreditCard,
  MessageCircle,
  TrendingUp,
  UserCheck,
  Users,
  UserX,
} from "@tamagui/lucide-icons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, RefreshControl, ScrollView } from "react-native";
import { Button, Card, H4, H6, Separator, Text, XStack, YStack } from "tamagui";
import CustomHeader from "../../components/CustomHeader";
import {
  AnnouncementItem,
  EventCard,
  QuickActionCard,
  StatCard,
} from "../../components/home";
import { ASSET_BASE_URL } from "../../config/api";
import { AuthService } from "../../services/authService";
import { MemberService } from "../../services/memberService";
import { User } from "../../types/auth";
import { TotalMemberStats } from "../../types/member";
import { TokenStorage } from "../../utils/tokenStorage";

export default function HomeScreen() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [memberStats, setMemberStats] = useState<TotalMemberStats | null>(null);
  const [subtitle, setSubtitle] = useState("");

  useEffect(() => {
    loadData();
    checkFirstVisit();
  }, []);

  // Refresh data pengguna apabila skrin difokuskan
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [])
  );

  const checkFirstVisit = async () => {
    const hasVisited = await TokenStorage.getHasVisitedHome();
    if (hasVisited) {
      setSubtitle("Selamat Datang Kembali");
    } else {
      setSubtitle("Selamat Datang");
      await TokenStorage.setHasVisitedHome(true);
    }
  };

  const loadData = async () => {
    await Promise.all([loadUserData(), loadMemberStats()]);
  };

  const loadUserData = async () => {
    try {
      setIsLoading(true);

      const cachedUser = await TokenStorage.getUser();
      if (cachedUser) {
        setUser(cachedUser);
      }

      const response = await AuthService.getMe();
      if (response.success) {
        setUser(response.data);
        await TokenStorage.saveUser(response.data);
        console.log("Data pengguna berjaya dimuat.");
      }
    } catch (error: any) {
      console.error("Gagal memuat data pengguna:", error);

      if (
        error?.message?.includes("Session expired") ||
        error?.status === 401
      ) {
        console.log("Sesi tamat, mengalihkan ke log masuk...");
        router.replace("/login");
        return;
      }

      const cachedUser = await TokenStorage.getUser();
      if (!cachedUser) {
        console.log("Tiada data pengguna, mengalihkan ke log masuk...");
        router.replace("/login");
      } else {
        console.log("Menggunakan data simpanan (mod luar talian)");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadMemberStats = async () => {
    try {
      const response = await MemberService.getTotalMembers();
      if (response.success) {
        setMemberStats(response.data);
        console.log("Statistik ahli dimuat:", response.data);
      }
    } catch (error: any) {
      console.error("Gagal memuat statistik ahli:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (isLoading && !user) {
    return (
      <YStack
        flex={1}
        backgroundColor="#F5F5F5"
        justifyContent="center"
        alignItems="center"
      >
        <ActivityIndicator size="large" color="#4A90E2" />
        <Text marginTop={12} color="#666">
          Memuatkan...
        </Text>
      </YStack>
    );
  }

  const profileImageUrl = user?.photo
    ? `${ASSET_BASE_URL}/Profil/${user.photo}`
    : undefined;

  return (
    <YStack flex={1} backgroundColor="#F5F5F5">
      <CustomHeader
        variant="withAvatar"
        userName={user?.fullname || "Pengguna"}
        subtitle={subtitle}
        avatarUrl={profileImageUrl}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <YStack padding={20} gap={20} paddingBottom={100}>
          {/* Statistik Komuniti */}
          <YStack gap={12}>
            <H6 fontWeight="600" color="#333">
              Gambaran Keseluruhan Komuniti
            </H6>
            <XStack gap={12}>
              <StatCard
                icon={Users}
                iconColor="#4A90E2"
                label="Jumlah Ahli"
                value={memberStats?.total_member.toString() || "0"}
                trend={`${memberStats?.total_active || 0} aktif`}
                trendColor="#34C759"
                TrendIcon={UserCheck}
              />
              <StatCard
                icon={Clock}
                iconColor="#FF9500"
                label="Tertunda"
                value={memberStats?.total_pending.toString() || "0"}
                trend="Perlu kelulusan"
                trendColor="#666"
              />
            </XStack>
            <XStack gap={12}>
              <StatCard
                icon={UserCheck}
                iconColor="#34C759"
                label="Aktif"
                value={memberStats?.total_active.toString() || "0"}
                trend="Ahli disahkan"
                trendColor="#34C759"
                TrendIcon={TrendingUp}
              />
              <StatCard
                icon={UserX}
                iconColor="#FF3B30"
                label="Tamat Tempoh"
                value={memberStats?.total_expired.toString() || "0"}
                trend="Perlu diperbaharui"
                trendColor="#FF3B30"
              />
            </XStack>
          </YStack>

          {/* Tindakan Pantas */}
          <YStack gap={12}>
            <H6 fontWeight="600" color="#333">
              Tindakan Pantas
            </H6>
            <XStack gap={12}>
              <QuickActionCard
                icon={Users}
                iconColor="#4A90E2"
                label="Ahli"
                onPress={() => router.push("/(tabs)/members")}
              />
              <QuickActionCard
                icon={CreditCard}
                iconColor="#34C759"
                label="Pembayaran"
                onPress={() => console.log("Pembayaran")}
              />
            </XStack>

            <XStack gap={12}>
              <QuickActionCard
                icon={MessageCircle}
                iconColor="#FF9500"
                label="Pengumuman"
                onPress={() => console.log("Pengumuman")}
              />
              <QuickActionCard
                icon={Calendar}
                iconColor="#AF52DE"
                label="Aktiviti"
                onPress={() => console.log("Aktiviti")}
              />
            </XStack>
          </YStack>

          {/* Pengumuman Terkini */}
          <YStack gap={12}>
            <XStack justifyContent="space-between" alignItems="center">
              <H6 fontWeight="600" color="#333">
                Pengumuman Terkini
              </H6>
              <Button
                size="$2"
                chromeless
                color="#4A90E2"
                onPress={() => router.push("/announcements")}
              >
                Lihat Semua
              </Button>
            </XStack>

            <Card
              padding={16}
              backgroundColor="white"
              borderRadius={12}
              shadowColor="#000"
              shadowOffset={{ width: 0, height: 1 }}
              shadowOpacity={0.05}
              shadowRadius={4}
            >
              <YStack gap={12}>
                <AnnouncementItem
                  icon={Bell}
                  iconColor="#4A90E2"
                  title="Mesyuarat Agung Tahunan 2024"
                  description="Sertai kami untuk AGM pada 15 Mac di Dewan Komuniti. Semua ahli dijemput hadir."
                  time="2 jam yang lalu"
                  onPress={() => router.push("/announcements/1")}
                />

                <Separator />

                <AnnouncementItem
                  icon={Bell}
                  iconColor="#34C759"
                  title="Peringatan Yuran Bulanan"
                  description="Peringatan mesra bahawa bayaran yuran bulanan perlu dijelaskan sebelum hujung minggu ini."
                  time="1 hari yang lalu"
                  onPress={() => router.push("/announcements/2")}
                />
              </YStack>
            </Card>
          </YStack>

          {/* Acara Akan Datang */}
          <YStack gap={12}>
            <XStack justifyContent="space-between" alignItems="center">
              <H6 fontWeight="600" color="#333">
                Acara Akan Datang
              </H6>
              <Button
                size="$2"
                chromeless
                color="#4A90E2"
                onPress={() => router.push("/events")}
              >
                Lihat Semua
              </Button>
            </XStack>

            <EventCard
              date="15"
              month="MAC"
              title="Hari Sukan Komuniti"
              time="Sabtu, 9:00 Pagi - 5:00 Petang"
              location="Kompleks Sukan Komuniti"
              color="#FF9500"
              onPress={() => router.push("/events/1")}
            />

            <EventCard
              date="22"
              month="MAC"
              title="Bengkel Perancangan Kewangan"
              time="Jumaat, 2:00 Petang - 4:00 Petang"
              location="Acara Dalam Talian"
              color="#AF52DE"
              onPress={() => router.push("/events/2")}
            />
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
