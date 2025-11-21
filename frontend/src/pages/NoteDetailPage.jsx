import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// Note detail removed — redirect to home
const NoteDetailPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, [navigate]);
  return null;
};

export default NoteDetailPage;
      </div>
    </div>
  );
};
export default NoteDetailPage;
