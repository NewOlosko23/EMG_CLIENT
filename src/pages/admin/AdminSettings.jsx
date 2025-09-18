import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Save, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle, 
  Globe, 
  Shield, 
  Database, 
  Mail, 
  CreditCard, 
  Bell, 
  Users, 
  Music, 
  BarChart3, 
  Server, 
  Key, 
  Upload, 
  Download,
  Trash2,
  Edit,
  Plus,
  X
} from "lucide-react";
import { PRESENCE_CURRENCIES } from "../../constants/presenceData";

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      platformName: "EMG Music Platform",
      platformDescription: "The ultimate platform for independent artists to share and monetize their music",
      platformUrl: "https://emgmusic.com",
      timezone: "UTC",
      language: "en",
      maintenanceMode: false,
      registrationEnabled: true,
      emailVerificationRequired: true
    },
    email: {
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUsername: "noreply@emgmusic.com",
      smtpPassword: "••••••••",
      fromName: "EMG Music Platform",
      fromEmail: "noreply@emgmusic.com",
      emailTemplates: {
        welcome: true,
        verification: true,
        passwordReset: true,
        trackApproved: true,
        trackRejected: true
      }
    },
    payment: {
      stripePublicKey: "pk_test_••••••••",
      stripeSecretKey: "sk_test_••••••••",
      paypalClientId: "••••••••",
      paypalClientSecret: "••••••••",
      commissionRate: 10,
      minimumPayout: 25,
      payoutSchedule: "monthly",
      currency: "KES"
    },
    storage: {
      maxFileSize: 100,
      allowedFormats: ["mp3", "wav", "flac", "aac"],
      storageProvider: "aws_s3",
      awsBucket: "emg-music-storage",
      awsRegion: "us-east-1",
      cdnEnabled: true
    },
    security: {
      sessionTimeout: 24,
      maxLoginAttempts: 5,
      twoFactorRequired: false,
      passwordMinLength: 8,
      passwordRequireSpecialChars: true,
      ipWhitelist: [],
      rateLimiting: {
        enabled: true,
        requestsPerMinute: 100,
        requestsPerHour: 1000
      }
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      smsNotifications: false,
      notificationTypes: {
        newUser: true,
        newTrack: true,
        trackApproved: true,
        trackRejected: true,
        paymentReceived: true,
        systemMaintenance: true
      }
    },
    api: {
      apiVersion: "v1",
      rateLimitEnabled: true,
      apiKeyRequired: false,
      webhookUrl: "",
      webhookSecret: "••••••••",
      corsOrigins: ["https://emgmusic.com", "https://app.emgmusic.com"]
    }
  });

  const [originalSettings, setOriginalSettings] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    setHasChanges(JSON.stringify(settings) !== JSON.stringify(originalSettings));
  }, [settings, originalSettings]);

  const loadSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOriginalSettings(JSON.parse(JSON.stringify(settings)));
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error loading settings:', error);
      setLoading(false);
    }
  };

  const saveSettings = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOriginalSettings(JSON.parse(JSON.stringify(settings)));
        setHasChanges(false);
        setLoading(false);
        // Show success message
      }, 1000);
    } catch (error) {
      console.error('Error saving settings:', error);
      setLoading(false);
    }
  };

  const resetSettings = () => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
    setHasChanges(false);
  };

  const updateSetting = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const updateNestedSetting = (category, parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey],
          [key]: value
        }
      }
    }));
  };

  const tabs = [
    { id: "general", name: "General", icon: Globe },
    { id: "email", name: "Email", icon: Mail },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "storage", name: "Storage", icon: Database },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "api", name: "API", icon: Server }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform Name</label>
          <input
            type="text"
            value={settings.general.platformName}
            onChange={(e) => updateSetting("general", "platformName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Platform URL</label>
          <input
            type="url"
            value={settings.general.platformUrl}
            onChange={(e) => updateSetting("general", "platformUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Platform Description</label>
        <textarea
          value={settings.general.platformDescription}
          onChange={(e) => updateSetting("general", "platformDescription", e.target.value)}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.general.timezone}
            onChange={(e) => updateSetting("general", "timezone", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">London</option>
            <option value="Europe/Paris">Paris</option>
            <option value="Asia/Tokyo">Tokyo</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select
            value={settings.general.language}
            onChange={(e) => updateSetting("general", "language", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
            <option value="pt">Portuguese</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Platform Features</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.general.maintenanceMode}
              onChange={(e) => updateSetting("general", "maintenanceMode", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Maintenance Mode</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.general.registrationEnabled}
              onChange={(e) => updateSetting("general", "registrationEnabled", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Allow New User Registration</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.general.emailVerificationRequired}
              onChange={(e) => updateSetting("general", "emailVerificationRequired", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require Email Verification</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderEmailSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.email.smtpHost}
            onChange={(e) => updateSetting("email", "smtpHost", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
          <input
            type="number"
            value={settings.email.smtpPort}
            onChange={(e) => updateSetting("email", "smtpPort", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
          <input
            type="text"
            value={settings.email.smtpUsername}
            onChange={(e) => updateSetting("email", "smtpUsername", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
          <input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => updateSetting("email", "smtpPassword", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
          <input
            type="text"
            value={settings.email.fromName}
            onChange={(e) => updateSetting("email", "fromName", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
          <input
            type="email"
            value={settings.email.fromEmail}
            onChange={(e) => updateSetting("email", "fromEmail", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Email Templates</h4>
        <div className="space-y-3">
          {Object.entries(settings.email.emailTemplates).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateNestedSetting("email", "emailTemplates", key, e.target.checked)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPaymentSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Public Key</label>
          <input
            type="text"
            value={settings.payment.stripePublicKey}
            onChange={(e) => updateSetting("payment", "stripePublicKey", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Stripe Secret Key</label>
          <input
            type="password"
            value={settings.payment.stripeSecretKey}
            onChange={(e) => updateSetting("payment", "stripeSecretKey", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Client ID</label>
          <input
            type="text"
            value={settings.payment.paypalClientId}
            onChange={(e) => updateSetting("payment", "paypalClientId", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Client Secret</label>
          <input
            type="password"
            value={settings.payment.paypalClientSecret}
            onChange={(e) => updateSetting("payment", "paypalClientSecret", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Commission Rate (%)</label>
          <input
            type="number"
            value={settings.payment.commissionRate}
            onChange={(e) => updateSetting("payment", "commissionRate", parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payout ($)</label>
          <input
            type="number"
            value={settings.payment.minimumPayout}
            onChange={(e) => updateSetting("payment", "minimumPayout", parseFloat(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
          <select
            value={settings.payment.currency}
            onChange={(e) => updateSetting("payment", "currency", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            {PRESENCE_CURRENCIES.map((currency) => (
              <option key={currency.value} value={currency.value}>
                {currency.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Payout Schedule</label>
        <select
          value={settings.payment.payoutSchedule}
          onChange={(e) => updateSetting("payment", "payoutSchedule", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
      </div>
    </div>
  );

  const renderStorageSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max File Size (MB)</label>
          <input
            type="number"
            value={settings.storage.maxFileSize}
            onChange={(e) => updateSetting("storage", "maxFileSize", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Storage Provider</label>
          <select
            value={settings.storage.storageProvider}
            onChange={(e) => updateSetting("storage", "storageProvider", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="aws_s3">AWS S3</option>
            <option value="google_cloud">Google Cloud Storage</option>
            <option value="azure">Azure Blob Storage</option>
            <option value="local">Local Storage</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Allowed File Formats</label>
        <div className="flex flex-wrap gap-2">
          {settings.storage.allowedFormats.map((format, index) => (
            <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
              {format}
              <button
                onClick={() => {
                  const newFormats = settings.storage.allowedFormats.filter((_, i) => i !== index);
                  updateSetting("storage", "allowedFormats", newFormats);
                }}
                className="ml-2 text-purple-600 hover:text-purple-800"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          <button
            onClick={() => {
              const newFormat = prompt("Enter new file format:");
              if (newFormat) {
                updateSetting("storage", "allowedFormats", [...settings.storage.allowedFormats, newFormat]);
              }
            }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <Plus className="h-3 w-3 mr-1" />
            Add Format
          </button>
        </div>
      </div>

      {settings.storage.storageProvider === "aws_s3" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AWS Bucket</label>
            <input
              type="text"
              value={settings.storage.awsBucket}
              onChange={(e) => updateSetting("storage", "awsBucket", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">AWS Region</label>
            <input
              type="text"
              value={settings.storage.awsRegion}
              onChange={(e) => updateSetting("storage", "awsRegion", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.storage.cdnEnabled}
            onChange={(e) => updateSetting("storage", "cdnEnabled", e.target.checked)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="ml-2 text-sm text-gray-700">Enable CDN for faster file delivery</span>
        </label>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (hours)</label>
          <input
            type="number"
            value={settings.security.sessionTimeout}
            onChange={(e) => updateSetting("security", "sessionTimeout", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
          <input
            type="number"
            value={settings.security.maxLoginAttempts}
            onChange={(e) => updateSetting("security", "maxLoginAttempts", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password Min Length</label>
          <input
            type="number"
            value={settings.security.passwordMinLength}
            onChange={(e) => updateSetting("security", "passwordMinLength", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rate Limit (requests/minute)</label>
          <input
            type="number"
            value={settings.security.rateLimiting.requestsPerMinute}
            onChange={(e) => updateNestedSetting("security", "rateLimiting", "requestsPerMinute", parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Security Features</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.twoFactorRequired}
              onChange={(e) => updateSetting("security", "twoFactorRequired", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require Two-Factor Authentication</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.passwordRequireSpecialChars}
              onChange={(e) => updateSetting("security", "passwordRequireSpecialChars", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require Special Characters in Passwords</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.security.rateLimiting.enabled}
              onChange={(e) => updateNestedSetting("security", "rateLimiting", "enabled", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Rate Limiting</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">Notification Channels</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.emailNotifications}
              onChange={(e) => updateSetting("notifications", "emailNotifications", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Email Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.pushNotifications}
              onChange={(e) => updateSetting("notifications", "pushNotifications", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Push Notifications</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.notifications.smsNotifications}
              onChange={(e) => updateSetting("notifications", "smsNotifications", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">SMS Notifications</span>
          </label>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Notification Types</h4>
        <div className="space-y-3">
          {Object.entries(settings.notifications.notificationTypes).map(([key, value]) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => updateNestedSetting("notifications", "notificationTypes", key, e.target.checked)}
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderApiSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">API Version</label>
          <input
            type="text"
            value={settings.api.apiVersion}
            onChange={(e) => updateSetting("api", "apiVersion", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
          <input
            type="url"
            value={settings.api.webhookUrl}
            onChange={(e) => updateSetting("api", "webhookUrl", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Webhook Secret</label>
        <input
          type="password"
          value={settings.api.webhookSecret}
          onChange={(e) => updateSetting("api", "webhookSecret", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">CORS Origins (one per line)</label>
        <textarea
          value={settings.api.corsOrigins.join('\n')}
          onChange={(e) => updateSetting("api", "corsOrigins", e.target.value.split('\n').filter(origin => origin.trim()))}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          placeholder="https://example.com"
        />
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900">API Features</h4>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.api.rateLimitEnabled}
              onChange={(e) => updateSetting("api", "rateLimitEnabled", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Enable Rate Limiting</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={settings.api.apiKeyRequired}
              onChange={(e) => updateSetting("api", "apiKeyRequired", e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <span className="ml-2 text-sm text-gray-700">Require API Key</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "general": return renderGeneralSettings();
      case "email": return renderEmailSettings();
      case "payment": return renderPaymentSettings();
      case "storage": return renderStorageSettings();
      case "security": return renderSecuritySettings();
      case "notifications": return renderNotificationSettings();
      case "api": return renderApiSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform settings and system preferences</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {hasChanges && (
            <button
              onClick={resetSettings}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset
            </button>
          )}
          <button
            onClick={saveSettings}
            disabled={!hasChanges || loading}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex flex-wrap gap-2 sm:gap-0 sm:space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-purple-500 text-purple-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading settings...</span>
          </div>
        ) : (
          renderTabContent()
        )}
      </div>

      {/* Save Status */}
      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0" />
            <span className="text-sm text-yellow-800">You have unsaved changes. Don't forget to save your settings.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
