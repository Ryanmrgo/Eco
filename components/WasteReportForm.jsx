import React, { useState } from "react";

const WasteReportForm = ({ locationName, onSubmit, lng, lat }) => {
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };


  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) return alert("Please upload a photo.");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("locationName", locationName);
      formData.append("photo", photo);
      if (lng !== undefined && lat !== undefined) {
        formData.append("lng", lng);
        formData.append("lat", lat);
      }
      const res = await fetch("/api/waste-report", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        onSubmit({ locationName, photo });
      } else {
        alert("Failed to submit waste report.");
      }
    } catch (err) {
      alert("Error submitting waste report.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 space-y-6 max-w-lg w-full mx-auto"
      style={{ minWidth: 320 }}
    >
      <div>
        <p className="text-base font-medium mb-2">Waste Photo</p>
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition min-h-[140px]">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="object-cover rounded-xl max-h-40 w-auto"
              style={{ maxWidth: 200 }}
            />
          ) : (
            <div className="flex flex-col items-center py-6">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400 mb-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 10l-4-4m0 0l-4 4m4-4v12" /></svg>
              <span className="text-gray-400 text-sm">Click to upload photo</span>
            </div>
          )}
        </label>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-base font-medium mb-1">Location</label>
        <input
          type="text"
          value={locationName}
          readOnly
          className="outline-none py-2 px-3 rounded border border-gray-300 bg-gray-100 text-gray-700 font-medium"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2.5 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Waste Report"}
      </button>
    </form>
  );
};

export default WasteReportForm;
