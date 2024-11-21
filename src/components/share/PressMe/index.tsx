import { Button, ButtonText } from "@/components/ui/button";
import { Center } from "@/components/ui/center";

export default () => {
  return (
    <Center className="flex flex-1 w-full bg-blue-200">
      <Button className={"bg-Airbnb"}>
        <ButtonText>Press me</ButtonText>
      </Button>
    </Center>
  )
};
