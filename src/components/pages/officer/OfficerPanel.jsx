import { Link, useNavigate } from "react-router-dom";
import Footer from "../home/sections/Footer.jsx";
import MotionDiv from "../../MotionDiv.jsx";

import { useEffect, useState } from "react";

import { authFetchAvatarURL, fetchProfileDetails } from "../../db/database.jsx";

import Loading from "../../../extras/Loading.jsx";
import ProfileImage from "../../state/ProfileImage.jsx";

import { Button } from "@/components/ui/button.jsx";
import { Card, CardHeader, CardContent } from "@/components/ui/card.jsx";
import { Table, TableHead, TableCell, TableHeader, TableRow, TableBody } from "@/components/ui/table.jsx";
import { Input } from "@/components/ui/input.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
 
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../auth/firebase.jsx";
import { collection, getDocs, limit, orderBy, query, startAfter, where } from "firebase/firestore";
import { MemberFilter } from "./OfficerUtils.jsx";

/*
officers panel
- members management
  - set values to fields, verify discord in case, etc
  - query function
  - database query

new layout
*/

function OfficerPanel() {
    const [ members, setMembers ] = useState([]);
    const [ lastDoc, setLastDoc ] = useState(null);
    const [ prevDocs, setPrevDocs ] = useState([]);
    const [ loading, setLoading ] = useState(false);


    const [ search, setSearch ] = useState("");
    const [ filter, setFilter ] = useState("name");

    const [page, setPage] = useState(0);

    const PAGE_SIZE = 10; // TODO

    const navigate = useNavigate();

    const fetchMembers = async (direction) => {
        setLoading(true);

        let q;
        const membersRef = collection(db, "users");

        if (search.trim() !== "") {
            q = query(
                membersRef,
                where(filter, ">=", search),
                where(filter, "<=", search + "\uf8ff"),
                orderBy("name"),
                limit(PAGE_SIZE)
            );
        } else {
            q = query(
                membersRef,
                orderBy("createdAt", "desc"), 
                limit(PAGE_SIZE)
            );
        }

        if (direction === "next" && lastDoc) {
            q = query(q, startAfter(lastDoc));
        }

        const snap = await getDocs(q);
        const newMembers = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        if (direction === "next") {
            setPrevDocs((prev) => [...prev, lastDoc]);
            setPage((p) => p + 1);
        } else if (direction === "prev") {
            setPrevDocs((prev) => prev.slice(0, -1));
            setPage((p) => Math.max(1, p - 1));
        }

        setLastDoc(snap.docs[snap.docs.length - 1]);
        setMembers(newMembers);
        setLoading(false);
    }

    const goNext = () => fetchMembers("next");
    const goPrev = async () => {
        if (prevDocs.length === 0) return;

        setLoading(true);

        const membersRef = collection(db, "users");
        const q = query(
            membersRef,
            orderBy("createdAt", "desc"),
            startAfter(prevDocs[prevDocs.length - 2]),
            limit(PAGE_SIZE)
        )

        const snap = await getDocs(q);
        const newMembers = snap.docs.map((doc) = ({ id: doc.id, ...doc.data() }));

        setLastDoc(snap.docs[snap.docs.length - 1]);
        setPrevDocs((prev) => prev.slice(0, -1));
        setMembers(newMembers);
        setPage((p) => Math.max(1, p - 1));
        setLoading(false);
    }

    useEffect(() => {
        document.title = "Officer | BulSU Computer Science Society";

        const unsub = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                await fetchProfile();
            } else {
                setDetails(null);
                setLoading(false);
                
                navigate("/");
            }
        });

        async function fetchProfile() {
            setLoading(true);

            try {
                const array = await fetchProfileDetails();
                
                if (array?.type !== "officer") {
                    // navigate("/");
                }
                
            } catch (error) {
                console.error(error);
                // navigate("/"); TODO ADD BACK
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();

        fetchMembers();
        return unsub;
    }, []);


    return (
        <div className='flex flex-col scroll-smooth min-h-screen bg-linear-to-b from-[#18230F] via-[#2b5016] to-[#324d22]'>
            <div className="flex justify-center items-center h-screen">
                <div className="py-[7%] px-[10%]">

                <Card className="max-w-7xl mx-auto my-auto shadow-md">
                    <CardHeader>
                        <h2 className="text-2xl font-semibold text-center">
                            Members
                        </h2>
                    </CardHeader>


                    <CardContent>
                        <MemberFilter filter={filter} setFilter={setFilter} />
                        <div className="flex justify-between mb-4">
                            <Input
                                placeholder={`Search by ${filter}...`}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && fetchMembers()}
                                className="w--1/2"
                            />
                            <Button onClick={() => fetchMembers()} className="cursor-pointer">Refresh</Button>
                        </div>

                        <div className="overflow-x-auto rounded-md border">
                            <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>College</TableHead>
                                <TableHead>Program</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Discord</TableHead>
                                <TableHead>Verified</TableHead>
                                <TableHead>Join Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center py-6 text-gray-400">
                                        Loading...
                                        </TableCell>
                                    </TableRow>
                                ) : members.length > 0 ? (
                                    members.map((m) => (
                                        <TableRow key={m.id}>
                                            <TableCell>{m.id}</TableCell>
                                            <TableCell>{m.type ? m.type.toUpperCase() : "N/A"}</TableCell>
                                            <TableCell>{m.name}</TableCell>
                                            <TableCell>{m.college}</TableCell>
                                            <TableCell>{m.program}</TableCell>
                                            <TableCell>{m.section}</TableCell>
                                            <TableCell>{m.email}</TableCell>
                                            <TableCell>{m.discord}</TableCell>
                                            <TableCell>{m.discord_verified ? "✅ Yes" : "❌"}</TableCell>
                                            <TableCell>
                                                {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleDateString() : "—"}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-6 text-gray-400">
                                        No members found
                                    </TableCell>
                                </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </div>

                        {/* PAGINATION */}
                        <div className="flex justify-between items-center mt-4">
                            <Button variant="outline" onClick={goPrev} disabled={page === 1 || page === 0 || loading}>
                            <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                            </Button>

                            <span className="text-sm text-gray-600">
                                Page {page}
                            </span>

                            <Button variant="outline" onClick={goNext} disabled={members.length < PAGE_SIZE || loading}>
                                Next <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            </div>
                 

            
        </div>
    );  
}

export default OfficerPanel;