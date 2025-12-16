export const APP_TITLE = "AI Video Director & Prompt Engineer";
export const MAX_FILE_SIZE_MB = 10;
export const SUPPORTED_AUDIO_TYPES = ["audio/mp3", "audio/mpeg", "audio/wav", "audio/aac", "audio/ogg", "audio/m4a"];

export const TEXTS = {
  en: {
    appTitle: "AI Video Director & Prompt Engineer",
    role: "PROMPT ENGINEER AGENT",
    newProject: "New Project",
    heroTitlePrefix: "Turn Audio into",
    heroTitleSuffix: "Visual Masterpieces",
    heroDesc: "Upload a voiceover, podcast clip, or story narration. The AI Director will analyze the context and generate consistent prompts for Videos or Images.",
    modeVideo: "Video Mode (8s Segments)",
    modeImage: "Image Mode (Scene Based)",
    chooseStyle: "Choose Visual Style",
    dropHere: "Drop the audio here",
    uploadClick: "Click to upload or drag and drop",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Max ${max}MB)`,
    analyzing: "Analyzing Content",
    analyzingDesc: "The AI Director is listening to your audio, analyzing the context, and composing precise prompts...",
    step1: "Listening",
    step2: "Contextualizing",
    step3: "Writing Prompts",
    analysisFailed: "Analysis Failed",
    tryAgain: "Try Again",
    resultTitle: "Director's Script",
    exportTxt: "Export TXT",
    downloadMd: "Download MD",
    copy: "Copy All",
    copied: "Copied!",
    footerPowered: "Powered by Gemini 2.5 Flash • Optimized for Video Generation Models",
    author: "Author",
    zalo: "Zalo"
  },
  vi: {
    appTitle: "Đạo diễn Video AI & Kỹ sư Prompt",
    role: "TRỢ LÝ KỸ SƯ PROMPT",
    newProject: "Dự án mới",
    heroTitlePrefix: "Biến âm thanh thành",
    heroTitleSuffix: "Kiệt tác Hình ảnh",
    heroDesc: "Tải lên giọng đọc, podcast hoặc câu chuyện. Đạo diễn AI sẽ phân tích ngữ cảnh và tạo ra các prompt nhất quán cho Video hoặc Ảnh minh họa.",
    modeVideo: "Chế độ Video (Cắt 8s/đoạn)",
    modeImage: "Chế độ Ảnh (Theo bối cảnh)",
    chooseStyle: "Chọn Phong cách Hình ảnh",
    dropHere: "Thả file âm thanh vào đây",
    uploadClick: "Nhấn để tải lên hoặc kéo thả",
    uploadLimit: (max: number) => `MP3, WAV, AAC, M4A (Tối đa ${max}MB)`,
    analyzing: "Đang phân tích nội dung",
    analyzingDesc: "Đạo diễn AI đang nghe âm thanh, phân tích ngữ cảnh và viết kịch bản hình ảnh chi tiết...",
    step1: "Đang nghe",
    step2: "Xử lý ngữ cảnh",
    step3: "Viết Prompt",
    analysisFailed: "Phân tích thất bại",
    tryAgain: "Thử lại",
    resultTitle: "Kịch bản Đạo diễn",
    exportTxt: "Xuất TXT",
    downloadMd: "Tải xuống MD",
    copy: "Sao chép",
    copied: "Đã chép!",
    footerPowered: "Được hỗ trợ bởi Gemini 2.5 Flash • Tối ưu hóa cho các mô hình tạo video",
    author: "Tác giả",
    zalo: "Zalo"
  }
};

export const VIDEO_STYLES = [
  { 
    id: 'cinematic', 
    name: 'Cinematic Movie',
    name_vi: 'Điện ảnh Hollywood',
    description: 'High budget, dramatic lighting, 8k, anamorphic lens',
    description_vi: 'Ngân sách cao, ánh sáng kịch tính, quay bằng lens Anamorphic',
    prompt_modifier: 'Cinematic lighting, photorealistic, 8k, shot on ARRI Alexa, color graded, dramatic atmosphere',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'photorealistic', 
    name: 'Photorealistic / Doc',
    name_vi: 'Tài liệu thực tế',
    description: 'Natural lighting, sharp focus, true-to-life details',
    description_vi: 'Ánh sáng tự nhiên, sắc nét, chi tiết chân thực như phim tài liệu',
    prompt_modifier: 'Hyper-realistic, documentary style, natural lighting, 4k, high texture detail, sharp focus',
    image: 'https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: '3d-animation', 
    name: '3D Animation', 
    name_vi: 'Hoạt hình 3D',
    description: 'Pixar/Disney style, Unreal Engine 5 render',
    description_vi: 'Phong cách Pixar/Disney, kết xuất Unreal Engine 5 rực rỡ',
    prompt_modifier: '3D Animation style, Pixar style, Unreal Engine 5 render, vibrant colors, soft lighting, cute and expressive',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'anime', 
    name: 'Anime / Japanese 2D', 
    name_vi: 'Anime Nhật Bản',
    description: 'Hand-drawn feel, vibrant, Makoto Shinkai style',
    description_vi: 'Nét vẽ tay 2D, màu sắc rực rỡ, phong cách Makoto Shinkai',
    prompt_modifier: 'Anime style, Makoto Shinkai art style, vibrant colors, detailed background art, high quality 2D animation',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    name_vi: 'Cyberpunk Viễn tưởng',
    description: 'Neon lights, dark atmosphere, high tech, sci-fi',
    description_vi: 'Đèn neon, không khí tối tăm, công nghệ cao, Sci-fi',
    prompt_modifier: 'Cyberpunk style, neon lighting, futuristic city, rain-slicked streets, high tech, dark atmosphere, blade runner vibe',
    image: 'https://images.unsplash.com/photo-1515630278258-407f66498911?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'vintage', 
    name: 'Vintage Film (16mm)', 
    name_vi: 'Phim nhựa cổ điển',
    description: 'Film grain, retro colors, nostalgic feel',
    description_vi: 'Hạt nhiễu film, màu hoài cổ, cảm giác cũ kỹ những năm 90',
    prompt_modifier: 'Vintage 16mm film look, film grain, retro color palette, nostalgic atmosphere, light leaks, old movie style',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'claymation', 
    name: 'Claymation', 
    name_vi: 'Hoạt hình đất sét',
    description: 'Textured, handmade feel, Aardman style',
    description_vi: 'Chất liệu đất sét, thủ công, phong cách Aardman',
    prompt_modifier: 'Claymation style, stop motion animation, plasticine texture, handmade look, studio lighting',
    image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'noir', 
    name: 'Film Noir', 
    name_vi: 'Phim Noir Đen Trắng',
    description: 'Black & white, high contrast, mysterious',
    description_vi: 'Đen trắng, tương phản cao, bí ẩn, kịch tính',
    prompt_modifier: 'Film noir style, black and white, high contrast, dramatic shadows, silhouetted figures, moody atmosphere, 1940s detective style',
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80'
  },
];

// --- NEW IMAGE STYLES (Optimized for Whisk/ImageFX/Imagen 3) ---
export const IMAGE_STYLES = [
  { 
    id: 'img-photography', 
    name: 'Pro Photography', 
    name_vi: 'Nhiếp ảnh Chuyên nghiệp',
    description: 'DSLR, 85mm lens, bokeh, studio lighting',
    description_vi: 'Máy ảnh DSLR, ống kính chân dung, xóa phông, ánh sáng studio',
    prompt_modifier: 'Professional photography, shot on Sony A7R IV, 85mm lens, f/1.8, bokeh, studio lighting, hyper-realistic, 8k, sharp focus',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-digital-art', 
    name: 'Digital Art', 
    name_vi: 'Tranh Vẽ Kỹ thuật số',
    description: 'ArtStation style, vibrant, highly detailed',
    description_vi: 'Phong cách ArtStation, rực rỡ, chi tiết cao',
    prompt_modifier: 'Digital art, trending on ArtStation, highly detailed, vibrant colors, clean lines, masterpiece, concept art style',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-oil-painting', 
    name: 'Oil Painting', 
    name_vi: 'Tranh Sơn Dầu',
    description: 'Textured canvas, impasto, classic art',
    description_vi: 'Vải canvas, vệt màu dày (impasto), nghệ thuật cổ điển',
    prompt_modifier: 'Oil painting style, textured canvas, impasto brushstrokes, classic art style, rich colors, dramatic lighting, masterpiece',
    image: 'https://images.unsplash.com/photo-1501472312651-726afe119ff1?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-watercolor', 
    name: 'Watercolor', 
    name_vi: 'Tranh Màu Nước',
    description: 'Soft, dreamy, wet-on-wet, paper texture',
    description_vi: 'Mềm mại, mộng mơ, hiệu ứng loang màu, nền giấy',
    prompt_modifier: 'Watercolor painting, soft pastel colors, wet-on-wet technique, textured paper background, artistic, dreamy, elegant',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-anime', 
    name: 'Anime Illustration', 
    name_vi: 'Minh họa Anime',
    description: 'High quality 2D, wallpaper, detailed background',
    description_vi: '2D chất lượng cao, hình nền đẹp, nền chi tiết',
    prompt_modifier: 'Anime illustration, high quality 2D, Kyoto Animation style, detailed background, vibrant, beautiful lighting, 4k wallpaper',
    image: 'https://images.unsplash.com/photo-1560972550-aba3456b5564?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-concept-art', 
    name: 'Epic Concept Art', 
    name_vi: 'Concept Art Sử thi',
    description: 'Wide scale, matte painting, cinematic',
    description_vi: 'Quy mô rộng lớn, tranh matte painting, không khí điện ảnh',
    prompt_modifier: 'Epic concept art, matte painting, wide angle, atmospheric perspective, highly detailed, cinematic lighting, fantasy landscape',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-vector', 
    name: 'Flat Vector Art', 
    name_vi: 'Đồ họa Vector Phẳng',
    description: 'Minimalist, clean shapes, Adobe Illustrator',
    description_vi: 'Tối giản, hình khối sạch, phong cách Adobe Illustrator',
    prompt_modifier: 'Flat vector art, minimalist, clean shapes, bold colors, Adobe Illustrator style, simple composition, graphic design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-sketch', 
    name: 'Pencil Sketch', 
    name_vi: 'Phác thảo Chì',
    description: 'Charcoal, graphite, rough lines, artistic',
    description_vi: 'Than chì, nét vẽ thô, nghệ thuật',
    prompt_modifier: 'Pencil sketch, charcoal drawing, graphite, rough lines, shading, artistic, monochromatic, sketchbook style',
    image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-surrealism', 
    name: 'Surrealism', 
    name_vi: 'Siêu thực',
    description: 'Dreamlike, Salvador Dali style, abstract',
    description_vi: 'Như giấc mơ, phong cách Salvador Dali, trừu tượng',
    prompt_modifier: 'Surrealism art style, dreamlike, abstract, melting forms, strange juxtaposition, Salvador Dali inspired, mysterious',
    image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-3d-render', 
    name: '3D Octane Render', 
    name_vi: '3D Render Octane',
    description: 'Raytracing, realistic materials, studio light',
    description_vi: 'Dò tia, vật liệu thực tế, ánh sáng studio',
    prompt_modifier: '3D render, Octane render, raytracing, realistic materials, subsurface scattering, studio lighting, C4D, 8k, masterpiece',
    image: 'https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-pop-art', 
    name: 'Pop Art', 
    name_vi: 'Nghệ thuật Pop Art',
    description: 'Andy Warhol style, bold colors, comic dots',
    description_vi: 'Phong cách Andy Warhol, màu đậm, chấm truyện tranh',
    prompt_modifier: 'Pop art style, Andy Warhol inspired, halftone dots, bold colors, comic book aesthetic, retro, high contrast',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'img-cyberpunk', 
    name: 'Cyberpunk', 
    name_vi: 'Cyberpunk',
    description: 'Neon, futuristic city, high tech',
    description_vi: 'Đèn neon, thành phố tương lai, công nghệ cao',
    prompt_modifier: 'Cyberpunk style, neon lights, futuristic city, rain, reflections, high tech, sci-fi atmosphere, vibrant colors',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80'
  }
];

// --- VIDEO MODE INSTRUCTION (Strict 8s) ---
export const getVideoSystemInstruction = (styleModifier: string, language: 'en' | 'vi') => {
  const isVietnamese = language === 'vi';
  return `
Bạn là một Chuyên gia Đạo diễn Video AI (AI Video Director). Nhiệm vụ: nghe audio, chia đoạn và tạo prompt video (Kling, Runway, Luma).

Operational Rules (Video Mode):
1. Segmentation (Chia đoạn): Chia toàn bộ audio thành các đoạn CỐ ĐỊNH theo thời gian, mỗi đoạn dài ĐÚNG 8 GIÂY (00:00-00:08, 00:08-00:16...). 
2. Prompt Matching:
   - Mỗi đoạn 8 giây = 1 Scene.
   - Scene 1 -> Prompt #1, Scene 2 -> Prompt #2.
   - Tuyệt đối không lệch số thứ tự.
3. Consistency Lock (Quan trọng):
   - Style: "${styleModifier}"
   - Tạo một "Master Description" chi tiết về nhân vật/bối cảnh.
   - BẮT BUỘC: Mọi prompt phải bắt đầu bằng "Master Description" để video không bị nhảy nhân vật.
4. Structure: [Master Description] + [Hành động trong 8s] + [Góc máy] --ar 16:9

Output Format (Markdown):
${isVietnamese ? 'Phân tích Tiếng Việt, Prompt Tiếng Anh.' : 'English only.'}

# ${isVietnamese ? 'PHÂN TÍCH VIDEO (8s/SHOT)' : 'VIDEO ANALYSIS (8s/SHOT)'}
**Style:** ${styleModifier}
**Master Description:** [Mô tả gốc]

# ${isVietnamese ? 'KỊCH BẢN CHI TIẾT' : 'DETAILED SCRIPT'}
## 🎬 Scene 1: [00:00 - 00:08]
- **Prompt #1:** [Master Description] + [Action] + [Camera] --ar 16:9

## 🎬 Scene 2: [00:08 - 00:16]
- **Prompt #2:** [Master Description] + [Action] + [Camera] --ar 16:9
...
`;
};

// --- IMAGE MODE INSTRUCTION (Scene Based) ---
export const getImageSystemInstruction = (styleModifier: string, language: 'en' | 'vi') => {
  const isVietnamese = language === 'vi';
  return `
Bạn là một Chuyên gia Minh họa AI (AI Illustrator) chuyên tạo prompt cho Google ImageFX (Imagen 3).

Operational Rules (Image Mode):
1. Segmentation (Chia đoạn):
   - KHÔNG chia theo giây cố định.
   - Hãy chia audio thành các "Phân cảnh" (Scenes) dựa trên sự thay đổi về nội dung, bối cảnh hoặc cảm xúc câu chuyện.

2. One-to-One Mapping (Rất quan trọng):
   - **Mỗi Phân cảnh (Scene) CHỈ ĐƯỢC có đúng 1 Prompt duy nhất.**
   - Tuyệt đối KHÔNG tạo nhiều lựa chọn (Option 1, Option 2).
   - Số thứ tự Prompt phải trùng với số thứ tự Scene (Scene 1 -> Prompt #1, Scene 2 -> Prompt #2).

3. Consistency Lock (Tính nhất quán tuyệt đối):
   - **Visual Style:** "${styleModifier}"
   - **Character & World:** Trước khi viết prompt chi tiết, hãy định nghĩa "Character Description" (Ngoại hình, trang phục, đặc điểm) và "Setting Description" (Không gian chung).
   - **Quy tắc:** Mọi prompt tạo ảnh PHẢI chứa các mô tả về nhân vật và bối cảnh giống hệt nhau, chỉ thay đổi hành động và biểu cảm.

4. Prompt Structure (Tối ưu cho Imagen 3):
   Format: "- **Prompt #X:** [Content]"
   Content: [Visual Style Keywords], [Character Description], [Action/Pose specific to this scene], [Detailed Background/Lighting], [Composition/Angle], high quality, highly detailed --ar 16:9

Output Format (Markdown):
${isVietnamese ? 'Phân tích Tiếng Việt, Prompt Tiếng Anh.' : 'English only.'}

# ${isVietnamese ? 'PHÂN TÍCH MINH HỌA (THEO BỐI CẢNH)' : 'ILLUSTRATION ANALYSIS (SCENE BASED)'}
**Style:** ${styleModifier}
**Consistent Character:** [Mô tả nhân vật cố định]
**Consistent Setting:** [Mô tả bối cảnh cố định]

# ${isVietnamese ? 'DANH SÁCH PROMPT TẠO ẢNH' : 'IMAGE PROMPT LIST'}

## 🖼️ Scene 1: [Tóm tắt nội dung/bối cảnh]
**${isVietnamese ? 'Thời gian' : 'Time'}:** [Ví dụ: 00:00 - 00:15]
- **Prompt #1:** [Style] + [Character] + [Specific Action] + [Setting] + [Details] --ar 16:9

## 🖼️ Scene 2: [Tóm tắt nội dung/bối cảnh]
**${isVietnamese ? 'Thời gian' : 'Time'}:** ...
- **Prompt #2:** [Style] + [Character] + [Specific Action] + [Setting] + [Details] --ar 16:9

...
`;
};