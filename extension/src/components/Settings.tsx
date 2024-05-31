import { Ellipsis } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [openaiApiKey, setOpenaiApiKey] = useState(
    localStorage.getItem("apiKey") ?? "",
  );

  const handleSubmit = async () => {
    localStorage.setItem("apiKey", openaiApiKey);
    setOpenaiApiKey("");
    toast({
      title: "Api key set successfully.",
      description: "Your openai api key has been saved to local storage.",
    });
  };
  return (
    <Drawer>
      <DrawerTrigger>
        <Ellipsis />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Api Key</DrawerTitle>
          <DrawerDescription>
            Add your openAI api key to start conversation.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Input
            value={openaiApiKey}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
            placeholder="sk-*****************************"
          />
          <Button onClick={() => handleSubmit()}>Submit</Button>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Settings;
