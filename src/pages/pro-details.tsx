import { useParams } from "react-router-dom";
import { allTournaments } from "@/data/tournaments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ProDetails = () => {
  const { id } = useParams();
  const tournament = allTournaments.find((t) => t.id === Number(id));

  if (!tournament) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] flex items-center justify-center text-white">
        Tournament not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#141110] to-[#6E4A2A] text-white font-chakra p-6">
      <div className="max-w-7xl mx-auto">
        <div
          className="h-64 bg-cover bg-center rounded-lg mb-8"
          style={{ backgroundImage: `url(${tournament.image})` }}
        >
          <div className="h-full w-full bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <h1 className="text-5xl font-bold text-white">
              {tournament.title}
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="bg-white/5 border-white/10 rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-accent">
                  Tournament Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-lg space-y-4">
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(tournament.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong>{" "}
                  {new Date(tournament.startDate).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Region:</strong> {tournament.region}
                </p>
                <p>
                  <strong>Prize Pool:</strong> {tournament.prize}
                </p>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-white/5 border-white/10 rounded-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-accent">
                  Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <Label htmlFor="teamName" className="text-white">
                        Team Name
                      </Label>
                      <Input
                        type="text"
                        id="teamName"
                        placeholder="Your Team Name"
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="playerName" className="text-white">
                        Player Name
                      </Label>
                      <Input
                        type="text"
                        id="playerName"
                        placeholder="Your Player Name"
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="coachName" className="text-white">
                        Coach Name
                      </Label>
                      <Input
                        type="text"
                        id="coachName"
                        placeholder="Your Coach's Name"
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sponsorName" className="text-white">
                        Sponsor Name
                      </Label>
                      <Input
                        type="text"
                        id="sponsorName"
                        placeholder="Your Sponsor's Name"
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/80"
                    >
                      Register
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProDetails;