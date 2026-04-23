import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Settings = () => {
  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your profile and preferences.</p>
      </div>

      <Card className="shadow-card space-y-5 p-6">
        <h2 className="text-sm font-semibold">Profile</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full name</Label>
            <Input id="name" defaultValue="Alex Rivera" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="alex@example.com" />
          </div>
        </div>
      </Card>

      <Card className="shadow-card space-y-5 p-6">
        <h2 className="text-sm font-semibold">Notifications</h2>
        <div className="space-y-4">
          {[
            { id: "deadline", label: "Deadline reminders", desc: "Get notified 7 and 1 days before each deadline." },
            { id: "result", label: "Application results", desc: "Email me when a scholarship status changes." },
            { id: "weekly", label: "Weekly digest", desc: "A short Monday summary of your pipeline." },
          ].map((n) => (
            <div key={n.id} className="flex items-start justify-between gap-4">
              <div>
                <Label htmlFor={n.id} className="text-sm font-medium">
                  {n.label}
                </Label>
                <p className="text-xs text-muted-foreground">{n.desc}</p>
              </div>
              <Switch id={n.id} defaultChecked={n.id !== "weekly"} />
            </div>
          ))}
        </div>
      </Card>

      <Card className="shadow-card space-y-5 p-6">
        <h2 className="text-sm font-semibold">Theme</h2>
        <RadioGroup defaultValue="dark" className="grid gap-3 sm:grid-cols-3">
          {["light", "dark", "system"].map((t) => (
            <Label
              key={t}
              htmlFor={`theme-${t}`}
              className="flex cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 capitalize hover:bg-muted/40"
            >
              <RadioGroupItem id={`theme-${t}`} value={t} />
              {t}
            </Label>
          ))}
        </RadioGroup>
      </Card>
    </div>
  );
};

export default Settings;
