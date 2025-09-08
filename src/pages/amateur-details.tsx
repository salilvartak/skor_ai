import { useParams } from "react-router-dom";
import { allTournaments } from "@/data/tournaments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AmateurDetails = () => {
  const { id } = useParams();
  const tournament = allTournaments.find((t) => t.id === Number(id));

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{tournament.title}</h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Tournament Information</h2>
          <p>
            <strong>Date:</strong> {new Date(tournament.startDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Time:</strong> {new Date(tournament.startDate).toLocaleTimeString()}
          </p>
          <p>
            <strong>Region:</strong> {tournament.region}
          </p>
          <p>
            <strong>Prize Pool:</strong> {tournament.prize}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Registration</h2>
          <form>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="teamName">Team Name</Label>
                <Input type="text" id="teamName" placeholder="Your Team Name" />
              </div>
              <div>
                <Label htmlFor="playerName">Player Name</Label>
                <Input
                  type="text"
                  id="playerName"
                  placeholder="Your Player Name"
                />
              </div>
              <Button type="submit">Register</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AmateurDetails;