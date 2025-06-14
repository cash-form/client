import { Checkbox } from "src/components/ui/checkbox";
import { Label } from "src/components/ui/label";
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";

export default function Page() {
  return (
    <div>
      <Button size="lg">large</Button>
      <Button size="lg" disabled>
        disabled
      </Button>

      <Button size="sm">123</Button>
      <Button size="icon">123</Button>
      <Button variant="outline">123</Button>
      <Button variant="secondary" disabled>
        123
      </Button>
      <Button variant="ghost">123</Button>
      <Button variant="link">123</Button>
      <Button variant="destructive">12qwe</Button>

      <Input />
      <Checkbox />
      <Label>라벨</Label>
    </div>
  );
}
