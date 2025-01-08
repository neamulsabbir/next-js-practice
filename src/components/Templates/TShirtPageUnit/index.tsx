"use client";

import { Button, Container, FileUploaderDnd } from "@/components/SharedFolder";
import { useEffect, useRef, useState } from "react";

interface Position {
	x: number;
	y: number;
}

interface Size {
	width: number;
	height: number;
}

const TShirtPageUnit = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const tShirtImageRef = useRef<HTMLImageElement>(null);
	const [logo, setLogo] = useState<HTMLImageElement | null>(null);
	const [logoLoaded, setLogoLoaded] = useState(false);
	const [dragging, setDragging] = useState<boolean>(false);
	const [position, setPosition] = useState<Position>({ x: 100, y: 100 });
	const [size, setSize] = useState<Size>({ width: 100, height: 100 });

	// Function to draw on canvas
	const drawCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		const tShirtImage = tShirtImageRef.current;
		if (tShirtImage?.complete) {
			ctx.drawImage(tShirtImage, 0, 0, canvas.width, canvas.height);
		}

		if (logo && logoLoaded) {
			ctx.drawImage(logo, position.x, position.y, size.width, size.height);
		}
	};

	useEffect(() => {
		const tShirtImage = tShirtImageRef.current;

		if (tShirtImage) {
			// Redraw canvas when t-shirt image loads
			tShirtImage.onload = () => {
				drawCanvas();
			};
		}

		drawCanvas();
	}, [logo, logoLoaded, position, size]);

	const handleLogoUpload = (file: File | null) => {
		if (file) {
			const img = new Image();
			img.src = URL.createObjectURL(file);
			img.onload = () => {
				setLogo(img);
				setLogoLoaded(true);
			};
		}
	};

	const handleMouseDown = () => {
		setDragging(true);
	};

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (!dragging || !canvasRef.current) return;

		const rect = canvasRef.current.getBoundingClientRect();
		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;

		setPosition({
			x: mouseX - size.width / 2,
			y: mouseY - size.height / 2,
		});
	};

	const handleMouseUp = () => {
		setDragging(false);
	};

	const handleResize = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!logo) return;

		const newWidth = parseInt(event.target.value, 10);
		setSize({
			width: newWidth,
			height: (newWidth * logo.height) / logo.width,
		});
	};

	const downloadFinalImage = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const link = document.createElement("a");
		link.download = "final-tshirt-design.png";
		link.href = canvas.toDataURL("image/png");
		link.click();
	};

	return (
		<Container>
			<div className="py-16">
				<h1 className="text-center text-5xl font-bold">Design Your T-Shirt</h1>
				<div className="grid 2xl:grid-cols-2 gap-4 pt-10">
					<div
						className="border rounded-md flex items-center justify-center p-5"
						onMouseMove={handleMouseMove}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
					>
						<canvas
							ref={canvasRef}
							width={400}
							height={400}
							style={{ cursor: logo ? "move" : "default" }}
						/>
						<img ref={tShirtImageRef} src="images/t_shirt.png" alt="T-shirt" className="hidden" />
					</div>

					<div>
						<FileUploaderDnd
							getFileHandler={handleLogoUpload}
							fileFormat={["image/jpeg", "image/jpg", "image/png"]}
							supportFormat="jpeg, jpg, png"
						/>

						{logo && (
							<div className="pt-5">
								<p>Image Resize</p>
								<input
									type="range"
									min="20"
									max="300"
									defaultValue={20}
									onChange={handleResize}
									disabled={!logo}
								/>

								<div className="flex gap-4 pt-5">
									<Button handleClick={downloadFinalImage} disabled={!logo}>
										Download Image
									</Button>

									<Button>Submit</Button>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Container>
	);
};

export default TShirtPageUnit;
